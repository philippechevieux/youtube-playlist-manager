import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button} from '@mui/material';
import {useHistory} from 'react-router-dom';

import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import './styles.css';
import {useAppSelector} from '../../app/hooks';
import {selectUserAccessToken} from '../../utils/arms/user/selectors';
import {useFetchPlaylistContents} from './hook';
import {
    selectPlaylistContentsItems,
    selectPlaylistContentsNextPageToken
} from '../../utils/arms/playlistContents/selectors';
import {selectPlaylistItem} from '../../utils/arms/playlists/selectors';
import EditPlaylistDialog from '../../containers/Dialog/EditPlaylistDialog';
import EmptyIllustration from '../../components/Assets/EmptyIllustration';
import {useTranslation} from 'react-i18next';
import Content from '../../containers/PlaylistContents/Content';
import ContentSkeleton from '../../containers/PlaylistContents/Content/Skeleton';
import {YouTubeEvent} from 'react-youtube';

function PlaylistContent({
    player,
    isPlayerPaused,
    playerVideoId,
    playerVideoIndex,
    setPlayerVideoIndex,
    setDisplayBottomPlayer,
    currentCuePlaylistId,
    setCurrentCuePlaylistId
}: {
    player: YouTubeEvent['target'];
    isPlayerPaused: boolean;
    playerVideoId: string;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    setDisplayBottomPlayer: Function;
    currentCuePlaylistId: string;
    setCurrentCuePlaylistId: Function;
}) {
    const {t} = useTranslation();

    let history = useHistory();
    const {playlistId} = useParams<{playlistId: string}>();

    const playlistItem = useAppSelector(state => selectPlaylistItem(state, playlistId));
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const nextPageTokenInStore = useAppSelector(state => selectPlaylistContentsNextPageToken(state, playlistId));
    const playlistContentsItems = useAppSelector(state => selectPlaylistContentsItems(state, playlistId));

    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
    const [isEditPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);

    const {arePlaylistContentsLoading, arePlaylistContentsLoaded} = useFetchPlaylistContents(
        userAccessToken,
        playlistId,
        nextPageToken
    );

    const handleHomeClick = () => {
        history.push('/playlists');
    };

    const loadMorePlaylisContents = () => {
        setNextPageToken(nextPageTokenInStore);
    };

    const displayPlaylistContent = () => {
        let content, skeleton, loadMore;

        if (playlistContentsItems.length > 0) {
            content = (
                <Content
                    player={player}
                    isPlayerPaused={isPlayerPaused}
                    playerVideoId={playerVideoId}
                    playerVideoIndex={playerVideoIndex}
                    setPlayerVideoIndex={setPlayerVideoIndex}
                    setDisplayBottomPlayer={setDisplayBottomPlayer}
                    currentCuePlaylistId={currentCuePlaylistId}
                    setCurrentCuePlaylistId={setCurrentCuePlaylistId}
                    playlistId={playlistId}
                    playlistsListItems={{items: playlistContentsItems}}
                />
            );
        }

        if (arePlaylistContentsLoaded && playlistContentsItems.length === 0) {
            content = <EmptyIllustration title={t('no video in your playlist')} />;
        }

        if (arePlaylistContentsLoading) {
            skeleton = <ContentSkeleton isFirstLoad={playlistContentsItems.length === 0} />;
        }

        if (nextPageTokenInStore !== undefined) {
            loadMore = (
                <div className="see-more-container">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            loadMorePlaylisContents();
                        }}
                    >
                        {t('see more')} ...
                    </Button>
                </div>
            );
        }

        return (
            <div>
                {content}
                {skeleton}
                {loadMore}
            </div>
        );
    };

    return (
        <div className="playlist-content">
            <AppBar position="static">
                <Box sx={{flexGrow: 1}}>
                    <Toolbar>
                        <Tooltip title={t('back')}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handleHomeClick()}
                            >
                                <ChevronLeftOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1" color="text.primary">
                            {playlistItem.snippet.localized.title}
                        </Typography>
                        <Box sx={{flexGrow: 1}} />
                        <Tooltip title={t('edit')}>
                            <IconButton
                                className="button-filter"
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    setIsPlaylistDialogOpen(true);
                                }}
                                color="inherit"
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Box>
            </AppBar>

            {displayPlaylistContent()}

            <EditPlaylistDialog
                visible={isEditPlaylistDialogOpen}
                playlistId={playlistId}
                onCancel={() => setIsPlaylistDialogOpen(false)}
            />
        </div>
    );
}

export default PlaylistContent;
