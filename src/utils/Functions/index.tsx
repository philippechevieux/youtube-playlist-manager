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

export const toHHMMSS = (secs: number) => {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor(secs / 60) % 60;
    var seconds = Math.floor(secs % 60);

    return [hours, minutes, seconds]
        .map(v => (v < 10 ? '0' + v : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
};
