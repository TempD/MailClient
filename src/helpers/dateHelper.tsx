import { differenceInDays, format, isSameMonth } from 'date-fns'

export const formatDate = (date: Date): string => {
  const today = new Date()
  const diffInDays = differenceInDays(today, date)
  if (diffInDays === 0) return format(date, 'H:mm')
  if (isSameMonth(today, date)) return format(date, 'MMM dd')
  return format(date, 'yyyy/MM/dd')
}

export const isSameDate = (firstDate: Date, secondDate: Date): Boolean => {
  const hasSameDate = firstDate.getDate() === secondDate.getDate()
  const hasSameMonth = firstDate.getMonth() === secondDate.getMonth()
  const hasSameYear = firstDate.getFullYear() === secondDate.getFullYear()

  return hasSameDate && hasSameMonth && hasSameYear
}
