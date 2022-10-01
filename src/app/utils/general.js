export function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export const convertBytesToMb = (bytes) => {
  return bytes * 9.537 * Math.pow(10, -7)
}
export const convertBytes = (bytes, decimals = 0) => {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0
  
  for (i; bytes > 1024; i++) {
      bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}
export const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`

