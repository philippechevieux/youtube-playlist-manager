import {IPlaylistItemsContent} from '../context/interface';

export const getThumbnailsFromItem = (Item: IPlaylistItemsContent): string => {
    let pathOrUrlOfThumbnails = '';

    if (Item.snippet.thumbnails !== undefined) {
        if (Item.snippet.thumbnails.high !== undefined) {
            pathOrUrlOfThumbnails = Item.snippet.thumbnails.high.url;
        }
    }

    return pathOrUrlOfThumbnails;
};
