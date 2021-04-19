import { TableFilter } from 'src/App'
import { EmailRecord } from 'src/SampleData'

export const sortEmailsByFilter = (emails: EmailRecord[], activeFilter: TableFilter): EmailRecord[] => {
  const simpleComparator = (a: string | number, b: string | number): number => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  const toComparator = (a: string[], b: string[]): number => {
    // First sort each array
    a = a.sort((a, b) => simpleComparator(a.toUpperCase(), b.toUpperCase()))
    b = b.sort((a, b) => simpleComparator(a.toUpperCase(), b.toUpperCase()))
    // Now compare from first values
    if (a[0] < b[0]) return -1
    if (a[0] > b[0]) return 1
    // If same length, array with shorter length goes first
    return a.length - b.length
  }

  return emails.sort((a, b): number => {
    if (activeFilter.filter === 'From') {
      return activeFilter.sortAscending === true ? simpleComparator(a.from.toUpperCase(), b.from.toUpperCase())
        : -(simpleComparator(a.from.toUpperCase(), b.from.toUpperCase()))
    }
    if (activeFilter.filter === 'Subject') {
      return activeFilter.sortAscending === true ? simpleComparator(a.subject.toUpperCase(), b.subject.toUpperCase())
        : -(simpleComparator(a.subject.toUpperCase(), b.subject.toUpperCase()))
    }
    if (activeFilter.filter === 'Date') {
      return activeFilter.sortAscending === true ? simpleComparator(a.date.getTime(), b.date.getTime())
        : -(simpleComparator(a.date.getTime(), b.date.getTime()))
    }
    return activeFilter.sortAscending === true ? toComparator(a.to, b.to) : -(toComparator(a.to, b.to))
  })
}
