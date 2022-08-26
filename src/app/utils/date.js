export const GetDayOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[day];
}
export const GetDayOfMonthAndShortMonthAndYear = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNames[month]}, ${year}`;
}
export const convertClassicDate = (date, withTime) => {
  return date?.toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime && {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  })
}
const addS = (value) => {
  if(value > 1) {
    return 's'
  }
  return ''
}
export const getTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000)
    if(seconds < 1)
      return 'Just now'
    else if(seconds < 60)
      return seconds + ` second${addS(seconds)} ago`
    else if(seconds < 3600)
      return Math.floor(seconds / 60) + ` minute${addS(Math.floor(seconds / 60))} ago`
    else if(seconds < 86400)
      return Math.floor(seconds / 3600) + ` hour${Math.floor(seconds / 3600)} ago`
    else if(seconds < 604800) //if less than 3 days
      return Math.floor(seconds / 86400) + ` day${addS(Math.floor(seconds / 86400))} ago`
    else if (seconds < 604800 * 4) 
      return Math.floor(seconds/604800) + ` week${addS(Math.floor(seconds/604800))} ago`
    else if(seconds < 604800 * 4 * 12) 
      return Math.floor(seconds/(604800*4)) + ` year${addS(Math.floor(seconds/(604800*4)))} ago`
    else
      return convertClassicDate(date)
}