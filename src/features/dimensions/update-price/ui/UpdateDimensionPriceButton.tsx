import { FormEventHandler, forwardRef, useState } from 'react'

import { Button, ButtonProps, Modal, TextField, Typography } from '@mui/material'

import { ModalContent } from '@/shared/ui'

export const UpdateDimensionPriceButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
    const handleOpen = () => setIsOpen(true)

    const handleUpdateSection: FormEventHandler = e => {
      e.preventDefault()

      console.log('update-price dimensions')
      handleClose()
    }

    return (
      <>
        <Button size='small' variant='gray' ref={ref} onClick={handleOpen} {...props} />

        <Modal open={isOpen} onClose={handleClose}>
          <ModalContent
            component='form'
            onSubmit={handleUpdateSection}
            display='flex'
            flexDirection='column'
            gap={3}
          >
            <Typography>
              Редатировать сечение 150x38x6 <br />
              для цеха 1
            </Typography>

            <TextField label='Цена' size='small' />

            <Button type='submit' variant='contained'>
              Редактировать
            </Button>
          </ModalContent>
        </Modal>
      </>
    )
  }
)
