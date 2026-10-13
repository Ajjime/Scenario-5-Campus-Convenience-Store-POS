// Helpers for a finished sale: a transaction number and a readable date/time.

// Adds a leading zero to one-digit numbers: 7 -> "07"
function twoDigits(number) {
  return String(number).padStart(2, '0')
}

// Builds a transaction number from the date and time, e.g. "TXN-20261013-143502".
// Using the time down to the second keeps numbers unique without a database.
export function createTransactionNumber(date) {
  const day =
    date.getFullYear() + twoDigits(date.getMonth() + 1) + twoDigits(date.getDate())
  const time =
    twoDigits(date.getHours()) + twoDigits(date.getMinutes()) + twoDigits(date.getSeconds())
  return 'TXN-' + day + '-' + time
}

// Formats a date like "Oct 13, 2026, 2:35:02 PM"
export function formatDateTime(date) {
  return date.toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'medium' })
}
