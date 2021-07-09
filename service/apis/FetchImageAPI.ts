import {FetchImageAPIType} from '../../model/FetchImageAPIType'
import {FlickrURL} from '../../assets/urls/FlickrURL'

const fetchFlickrAPI: FetchImageAPIType = () => {
    return fetch(FlickrURL.FLICKR_LANDSCAPE_PORTRAIT_URL)
        .then(response => {
            return response.json()
        })
        .then(j => {
            return j.items.map((item: { media: { m: string } }) => {
                return item.media.m
            })
        })
}

export const fetchImageAPI = fetchFlickrAPI
