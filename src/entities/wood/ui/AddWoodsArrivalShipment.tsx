import { Button, Modal, TextField, Typography } from '@mui/material'
import { ModalContent } from '@/shared/ui'
import { FC, FormEventHandler, useState } from 'react'

export interface AddWoodsArrivalShipmentProps {
  title: string
  onSubmit: () => void
}

export const AddWoodsArrivalShipment: FC<AddWoodsArrivalShipmentProps> = ({ title, onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <>
      <Button size='small' onClick={handleOpen}>
        Добавить
      </Button>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent
          component='form'
          onSubmit={handleSubmit}
          display='flex'
          flexDirection='column'
          gap={1}
        >
          <Typography sx={{ mb: 2 }}>{title}</Typography>
          <TextField label='Сечение' />
          <TextField label='Сорт' />
          <TextField label='Количество' />
          <Button type='submit' sx={{ mt: 2 }}>
            Добавить
          </Button>
        </ModalContent>
      </Modal>
    </>
  )
}
