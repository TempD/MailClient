import IconArrowPath from 'Assets/icon_arrow02.svg'
import IconClipPath from 'Assets/icon_clip.svg'
import IconMailPath from 'Assets/icon_mail_sp.svg'
import { formatDate } from 'Helpers/dateHelper'
import * as React from 'react'
import { useContext } from 'react'
import { ModalCtx } from 'Src/App'
import { EmailRecord } from 'Src/SampleData'

interface TableRowsProps {
  emails: EmailRecord[]
  mobileRender: Boolean
}

const defaultProps: TableRowsProps = {
  emails: [],
  mobileRender: false
}

const TableRows = ({ emails, mobileRender }: TableRowsProps): JSX.Element => {
  const modalContext = useContext(ModalCtx)
  const renderEmailTo = (email: string[]): React.ReactNode => {
    const renderedEmail: string = email[0]
    return (
      <div className='px-0'>
        {email.length > 1
          ? (
            <div className='d-flex'>
              <span className='col text-truncate pe-1'>{`${renderedEmail}, ...`}</span>
              <span className='d-inline-flex justify-content-end col-auto px-1 rounded fw-bold overflow-icon'>{`+${email.length - 1}`}</span>
            </div>) : renderedEmail}
      </div>
    )
  }

  const viewEmailBody = (email: EmailRecord): void => {
    modalContext?.toggleModalCallback(email.subject, email.body)
  }

  if (mobileRender === true) {
    return (
      <div className='px-1'>
        {emails.map((email, index) => {
          return (
            <div
              className='p-2 border-bottom'
              key={`email-row-mobile-${index}`}
              onClick={() => viewEmailBody(email)}
            >
              <div className='row mobile-row'>
                <div className='col-auto pe-0'>
                  <img className='ms-1 mt-2' src={IconMailPath} alt='Mail Icon' />
                </div>
                <div className='col-10'>
                  <div className='row'>
                    <span className='d-inline-flex align-items-center col text-truncate fw-bold px-0'>
                      <span className='col'>{email.from}</span>
                      <span className='d-inline-flex justify-content-end col offset-2'>{email.attachments &&
                        <img className='mobile-clip' src={IconClipPath} alt='Paperclip Icon' />}
                      </span>
                    </span>
                    <span className='col-auto text-end pe-0'>
                      {`${formatDate(email.date)}  `}
                      <img className='mobile-date-arrow mb-1' src={IconArrowPath} alt='Date Arrow Icon' />
                    </span>
                  </div>
                  <div className='row'>
                    {renderEmailTo(email.to)}
                  </div>
                </div>
              </div>
              <div className='row'>
                <span className='text-truncate fs-5 px-4'>{email.subject}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <tbody>
      {emails.map((email, index) => {
        return (
          <tr key={`email-row-${index}`} onClick={() => viewEmailBody(email)}>
            <td>{email.from}</td>
            <td>{renderEmailTo(email.to)}</td>
            <td>
              <div className='d-flex'>
                <span className='col text-truncate'>{email.subject}</span>
                <span className='d-inline-flex justify-content-end col-auto'>{email.attachments &&
                  <img className='mobile-clip' src={IconClipPath} alt='Paperclip Icon' />}
                </span>
              </div>
            </td>
            <td className='fw-bold'>{formatDate(email.date)}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

TableRows.defaultProps = defaultProps

export default TableRows
