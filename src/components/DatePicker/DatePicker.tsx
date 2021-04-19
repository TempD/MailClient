import SearchSVGPath from 'Assets/icon_search.svg'
import formatDate from 'date-fns/format'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { FilterInput } from 'src/App'

export type DatePickerValue = Date | null

interface DatePickerProps {
  filterEmailsCallback: (filterInput: FilterInput) => void
}

const DatePicker = ({ filterEmailsCallback }: DatePickerProps): JSX.Element => {
  const [startDate, setStartDate] = useState<DatePickerValue>(null)
  const [endDate, setEndDate] = useState<DatePickerValue>(null)
  const dateFormat = 'yyyy/MM/dd'
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.value = formatDateOuput()
    }
  }, [startDate, endDate])

  const onDateChange = (dates: ([Date, Date] | null)): void => {
    if (dates !== null) {
      setStartDate(dates[0])
      setEndDate(dates[1])
    } else {
      setStartDate(null)
      setEndDate(null)
    }

    filterEmailsCallback(dates)
  }

  const filterByText = (): void => {
    if (inputEl.current !== null) {
      // Not allowing date output as a filter string
      if ((startDate === null && endDate === null) && inputEl.current.value.length > 0) {
        filterEmailsCallback(inputEl.current.value)
      }
    }
  }

  const onCalendarOpen = (): void => {
    setStartDate(null)
    setEndDate(null)
    clearSearchState()
  }

  const formatDateOuput = (): string => {
    // No date filter applied
    if (startDate === null && endDate === null) return ''
    if (endDate === null) {
      return `${formatDate(startDate as Date, dateFormat)} - ${formatDate(new Date(), dateFormat)}`
    }
    return `${formatDate(startDate as Date, dateFormat)} - ${formatDate(endDate, dateFormat)}`
  }

  const clearSearchState = (e?: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    if (inputEl.current !== null) {
      if (inputEl.current.value !== '') {
        inputEl.current.value = ''
        setStartDate(null)
        setEndDate(null)
        filterEmailsCallback(null)
      }
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (inputEl.current?.value.length === 0) {
      filterEmailsCallback(null)
    }

    if (e.key === 'Enter') {
      filterByText()
    }
  }

  return (
    <div>
      <div className='row my-4 me-1'>
        <div className='col-1 pe-0' id='datepicker'>
          <ReactDatePicker
            selected={startDate}
            onChange={onDateChange}
            onCalendarOpen={onCalendarOpen}
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            dateFormat={formatDateOuput()}
            shouldCloseOnSelect={(startDate !== null) && (endDate === null)}
            todayButton='Today'
            placeholderText='Filter by date range'
            className='datepicker-input form-control'
            wrapperClassName='datepicker-wrapper'
            showMonthDropdown
            showYearDropdown
            selectsRange
            isClearable
            closeOnScroll
          />
        </div>
        <input
          className='form-control'
          ref={inputEl}
          type='search'
          name='Search Input'
          id='search-input'
          placeholder='Search email content'
          onClick={clearSearchState}
          onKeyDown={handleInputKeyPress}
        />
        <span className='col-auto search-svg-container d-flex align-items-center border rounded-end' onClick={filterByText}>
          <img src={SearchSVGPath} alt='Search icon' />
        </span>
      </div>
    </div>
  )
}

export default DatePicker
