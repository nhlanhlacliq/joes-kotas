import type { ZodError } from 'zod'

// Returns a string representing how long ago the input date was.
export function timeAgo(date: string) {
  if (!date) return
  const inputDate = new Date(date)

  const timeAgoInMs = new Date().getTime() - inputDate.getTime()

  // const minsAgo = Math.floor(timeAgoInMs / (1000 * 60)) - inputDate.getTimezoneOffset()
  const minsAgo = Math.floor(timeAgoInMs / (1000 * 60))
  if (minsAgo < 60) {
    if (minsAgo < 1) {
      return 'Just now'
    }
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

// Sort function for strings
export function stringSort(a: string, b: string) {
  if (a.toLowerCase() < b.toLowerCase()) return -1
  if (a.toLowerCase() > b.toLowerCase()) return 1
  return 0
}

// Sort function for dates
export function dateSort(a: string, b: string) {
  if (new Date(a).getTime() < new Date(b).getTime()) return 1
  if (new Date(a).getTime() > new Date(b).getTime()) return -1
  return 0
}

export const parseZodError = (error: ZodError | unknown, alternateMessage: string) => {
  // @ts-expect-error
  if (error.response.data.error.name === 'ZodError') {
    // @ts-expect-error
    return error.response.data.error.issues[0].message
  } else {
    return alternateMessage || 'An error occurred.'
  }
}
