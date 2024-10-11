// Returns a string representing how long ago the input date was.
export function timeAgo(date: string) {
  if (!date) return
  const inputDate = new Date(date)

  const timeAgoInMs = new Date().getTime() - inputDate.getTime()

  const minsAgo = Math.floor(timeAgoInMs / (1000 * 60)) - inputDate.getTimezoneOffset()
  if (minsAgo < 60) {
    return `${minsAgo} minute(s) ago`
  }

  const hoursAgo = Math.floor(minsAgo / 60)
  if (hoursAgo < 24) {
    return `${hoursAgo} hour(s) ago`
  }

  // Check if the date was yesterday
  const now = new Date()
  if (
    now.getDate() - 1 === inputDate.getDate() &&
    now.getMonth() === inputDate.getMonth() &&
    now.getFullYear() === inputDate.getFullYear()
  ) {
    return 'Yesterday'
  }

  // Otherwise, return the formatted date (e.g., "MM/DD/YYYY")
  return inputDate.toDateString()
}
