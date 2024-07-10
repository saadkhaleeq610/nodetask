import url from 'url'

const urlStr = 'https://www.google.com/search?q=hello+world';

const urlObj = new URL(urlStr);

console.log(urlObj);

console.log(url.format(urlObj));

console.log(url.fileURLToPath(import.meta.url));

console.log(urlObj.search);

const params = new URLSearchParams(urlObj.search)

console.log(params);

params.append('limit', '5')
params.delete('5')

console.log(params);