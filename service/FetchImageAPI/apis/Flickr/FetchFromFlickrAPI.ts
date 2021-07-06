import {FetchImageAPIType} from '../../../../hooks/UseSlideActions'

export const fetchFromFlickrAPI: FetchImageAPIType = (urlFlickr) => {
    return fetch(urlFlickr)
        .then(response => {
            return response.json()
        })
        .then(j => {
            return j.items.map((item: { media: { m: string } }) => {
                return item.media.m
            })
        })
}