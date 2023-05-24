import MD5 from 'crypto-js/md5'

const getShortUrl = (url: string): string => {
    return MD5(url).toString().slice(0, 5)
}

export { getShortUrl };