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
export const addS = (value) => {
  if(value > 1 || value == 0) {
    return 's'
  }
  return ''
}
export const getTimeAgo = (date, isActiveAgo) => {
    const seconds = Math.floor((Date.now() - date) / 1000)
    if(isActiveAgo) {
      if(seconds < 1)
        return 'Active Now'
      else if(seconds < 60)
        return `Active ${seconds} second${addS(seconds)} ago`
      else if(seconds < 3600)
        return `Active ${Math.floor(seconds / 60)} minute${addS(Math.floor(seconds / 60))} ago`
      else if(seconds < 86400)
        return  `Active ${Math.floor(seconds / 3600)} hour${addS(Math.floor(seconds / 3600))} ago`
      else if(seconds < 604800) //if less than 3 days
        return  `Active ${Math.floor(seconds / 86400)} day${addS(Math.floor(seconds / 86400))} ago`
      else 
        return ''
    }
    else {
      if(seconds < 1)
       return 'Just now'
      else if(seconds < 60)
        return seconds + ` second${addS(seconds)} ago`
      else if(seconds < 3600)
        return Math.floor(seconds / 60) + ` minute${addS(Math.floor(seconds / 60))} ago`
      else if(seconds < 86400)
        return Math.floor(seconds / 3600) + ` hour${addS(Math.floor(seconds / 3600))} ago`
      else if(seconds < 604800) //if less than 3 days
        return Math.floor(seconds / 86400) + ` day${addS(Math.floor(seconds / 86400))} ago`
      else 
        return convertClassicDate(date)
    }

}