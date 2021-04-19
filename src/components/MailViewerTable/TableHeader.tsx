import HeaderArrowPath from 'Assets/icon_arrow01.svg'
import * as React from 'react'
import { useEffect } from 'react'
import { TableFilter, ValidFilters } from 'Src/App'

interface TableHeaderProps {
  headerClickCallback: (selectedFilter: TableFilter) => void
  activeFilter: TableFilter
  mobileRender: Boolean
}

const TableHeader = ({ headerClickCallback, activeFilter, mobileRender }: TableHeaderProps): JSX.Element => {
  useEffect(() => {
    const headers = Array.from(document.getElementsByTagName('th'))
    headers.forEach((el) => {
      if (getFilterText(el) === activeFilter.filter) {
        el.classList.add('selected')
        if (activeFilter.sortAscending === false) {
          el.classList.add('sort-desc')
        }
      }
    })
  }, [])
  const getFilterText = (el: HTMLTableHeaderCellElement): ValidFilters => {
    if (el.nodeName === 'IMG') {
      if (el.parentElement?.innerText !== undefined) {
        return el.parentElement?.innerText.trimEnd() as ValidFilters
      }
    }
    return el.innerText.trimEnd() as ValidFilters
  }
  const handleOnClick = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>): void => {
    const target = e.currentTarget
    const filterName = getFilterText(target)
    const headerChildren = Array.from(e.currentTarget.parentNode?.children as HTMLCollection)
    let sortAscending = filterName !== 'Date'

    if (target.classList.contains('selected')) {
      if (target.classList.contains('sort-desc')) {
        target.classList.remove('sort-desc')
        if (filterName === 'Date') {
          sortAscending = !sortAscending
        }
      } else {
        if (filterName !== 'Date') {
          sortAscending = !sortAscending
        }
        target.classList.add('sort-desc')
      }
    }
    target.classList.add('selected')
    if (filterName === 'Date' && !sortAscending) {
      target.classList.add('sort-desc')
    }

    headerChildren.forEach((headerEl) => {
      if (headerEl !== target) {
        headerEl.classList.remove('selected')
        headerEl.classList.remove('sort-desc')
      }
    })

    headerClickCallback({ filter: filterName, sortAscending })
  }

  if (mobileRender === true) {
    return (
      <div className='row-cols-auto d-flex align-items-center text-emphasized fw-bold header-wrapper px-3 border-bottom border-top'>
        <span className='col text-center header-item' onClick={handleOnClick}>From <img src={HeaderArrowPath} alt='Table sorting arrow' /></span>
        <span className='col mx-1'>|</span>
        <span className='col mx-1 text-center header-item' onClick={handleOnClick}>To <img src={HeaderArrowPath} alt='Table sorting arrow' /></span>
        <span className='col mx-1'>|</span>
        <span className='col mx-1 text-center header-item' onClick={handleOnClick}>Subject <img src={HeaderArrowPath} alt='Table sorting arrow' /></span>
        <span className='col mx-1'>|</span>
        <span className='col mx-1 header-item' onClick={handleOnClick}>Date <img src={HeaderArrowPath} alt='Table sorting arrow' /></span>
      </div>
    )
  }

  return (
    <thead className='text-emphasized header border-top'>
      <tr>
        <th scope='col' onClick={handleOnClick}>
          <span className='t-header header-item'>
            From <img src={HeaderArrowPath} alt='Table sorting arrow' />
          </span>
        </th>
        <th scope='col' onClick={handleOnClick}>
          <span className='t-header header-item'>
            To <img src={HeaderArrowPath} alt='Table sorting arrow' />
          </span>
        </th>
        <th scope='col' onClick={handleOnClick}>
          <span className='t-header header-item'>
            Subject <img src={HeaderArrowPath} alt='Table sorting arrow' />
          </span>
        </th>
        <th scope='col' onClick={handleOnClick}>
          <span className='t-header header-item'>
            Date <img src={HeaderArrowPath} alt='Table sorting arrow' />
          </span>
        </th>
      </tr>
    </thead>
  )
}

export default TableHeader
