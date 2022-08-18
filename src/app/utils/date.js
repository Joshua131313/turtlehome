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
const convertClassicDate = () => {
    
}
export const getTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000)
    if(seconds < 1)
      return 'Just now'
    else if(seconds < 60)
      return seconds + 's'
    else if(seconds < 3600)
      return Math.floor(seconds / 60) + 'm'
    else if(seconds < 86400)
      return Math.floor(seconds / 3600) + 'h'
    else if(seconds < 259200) //if less than 3 days
      return Math.floor(seconds / 86400) + 'd'
    else
      return convertClassicDate(date)
}