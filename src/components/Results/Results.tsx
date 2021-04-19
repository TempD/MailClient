import * as React from 'react'

interface ResultsProps {
  mailCount: number
}

const Results = ({ mailCount }: ResultsProps): JSX.Element => {
  return (
    <div>
      <div className='mx-md-0'>
        <div className='text-emphasized fw-bold ps-md-0'>
          Results: <span className='fs-5'>{mailCount}</span> mail(s)
        </div>
      </div>
    </div>
  )
}

export default Results
