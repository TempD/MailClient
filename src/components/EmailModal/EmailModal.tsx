import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ModalContent } from 'Src/App'

interface EmailModalProps {
  showModal: boolean
  closeHandler: () => void
  modalContent: ModalContent
}

const EmailModal = ({ showModal, closeHandler, modalContent }: EmailModalProps): JSX.Element => {
  return (
    <Modal show={showModal} centered onHide={closeHandler}>
      <Modal.Header>
        <Modal.Title>{modalContent.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent.content}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EmailModal
