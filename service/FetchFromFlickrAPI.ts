export const fetchFromFlickrAPI = (urlFlickr: string) => {
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
