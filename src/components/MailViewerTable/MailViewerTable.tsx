import logo from 'Assets/logo.png'
import * as React from 'react'
import { EmailRecord } from 'src/SampleData'
import TableRows from './TableRows'

interface MailViewerTableProps {
  emails: EmailRecord[]
  tableHeader: (mobileRender: Boolean) => JSX.Element
}

const MailViewerTable = ({ emails, tableHeader }: MailViewerTableProps): JSX.Element => {
  if (emails.length === 0) {
    return (
      <div className='container vh-100 border-top mx-md-4'>
        <img className='position-absolute top-50 start-50 translate-middle' src={logo} alt='Mail logo' />
      </div>
    )
  }

  return (
    <div className='vh-100'>
      <div className='d-block d-md-none'>
        {tableHeader(true)}
        <TableRows emails={emails} mobileRender />
      </div>
      <div className='d-none d-md-block px-4'>
        <table className='table table-hover'>
          {tableHeader(false)}
          <TableRows emails={emails} mobileRender={false} />
        </table>
      </div>
    </div>
  )
}

export default MailViewerTable
