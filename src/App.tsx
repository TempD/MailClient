import DatePicker, { DatePickerValue } from 'Components/DatePicker/DatePicker'
import EmailModal from 'Components/EmailModal/EmailModal'
import MailViewerTable from 'Components/MailViewerTable/MailViewerTable'
import TableHeader from 'Components/MailViewerTable/TableHeader'
import Results from 'Components/Results/Results'
import { isAfter, isEqual, isWithinInterval } from 'date-fns'
import { isSameDate } from 'Helpers/dateHelper'
import { sortEmailsByFilter } from 'Helpers/emailHelper'
import get from 'lodash-es/get'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import SampleData, { EmailRecord } from './SampleData'

export type DatePickerResult = [DatePickerValue, DatePickerValue] | null
export type FilterInput = string | DatePickerResult
export type ValidFilters = 'Date' | 'To' | 'Subject' | 'From'
export type SortAscending = Boolean
export interface TableFilter {
  filter: ValidFilters
  sortAscending: SortAscending
}
export interface ModalContextInterface {
  toggleModalCallback: (title: string, content: string) => void
}
export interface ModalContent {
  title: string
  content: string
}

export const ModalCtx = React.createContext<ModalContextInterface | null>(null)

const App = (): JSX.Element => {
  const [emails, setEmails] = useState<EmailRecord[]>(SampleData.data)
  const [activeFilter, setActiveFilter] = useState<TableFilter>({ filter: 'Date', sortAscending: false })
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ModalContent>({ title: 'Default Title', content: 'Default content' })

  const modalContext: ModalContextInterface = {
    toggleModalCallback: (title, content) => {
      setModalContent({ title, content })
      setShowModal(!showModal)
    }
  }

  useEffect(() => {
    const sortedEmails = sortEmailsByFilter(emails, activeFilter)
    setEmails([...sortedEmails])
  }, [activeFilter])

  const filterEmails = (filterInput: FilterInput): void => {
    let emailData = SampleData.data

    if (typeof filterInput === 'string') {
      emailData = emailData.filter((email) => email.body.toLowerCase().includes(filterInput.toLowerCase()))
    } else {
      const startDate = get(filterInput, '0', null)
      const endDate = get(filterInput, '1', null)

      if (endDate === null && startDate !== null) {
        emailData = emailData.filter((email) => isAfter(email.date, startDate) || isEqual(email.date, startDate))
      }
      if (startDate !== null && endDate !== null) {
        emailData = emailData.filter((email) => isWithinInterval(email.date, { start: startDate, end: endDate }) || isSameDate(email.date, endDate))
      }
    }

    setEmails([...sortEmailsByFilter(emailData, activeFilter)])
  }

  const updateActiveFilter = (selectedFilter: TableFilter): void => {
    setActiveFilter(selectedFilter)
  }

  const tableHeaderComponent = (mobileRender: Boolean): JSX.Element => {
    return mobileRender === true
      ? (<TableHeader headerClickCallback={updateActiveFilter} activeFilter={activeFilter} mobileRender />)
      : (<TableHeader headerClickCallback={updateActiveFilter} activeFilter={activeFilter} mobileRender={false} />)
  }
  return (
    <>
      <div className='container-fluid px-0'>
        <div className='px-3 px-md-4'>
          <DatePicker filterEmailsCallback={filterEmails} />
        </div>
        <div className='px-3 px-md-0 mx-md-4 px-md-0'>
          <Results mailCount={emails.length} />
        </div>
        <ModalCtx.Provider value={modalContext}>
          <div>
            <MailViewerTable emails={emails} tableHeader={tableHeaderComponent} />
          </div>
        </ModalCtx.Provider>
      </div>
      <EmailModal
        showModal={showModal}
        closeHandler={() => setShowModal(!showModal)}
        modalContent={modalContent}
      />
    </>
  )
}

export default hot(App)
