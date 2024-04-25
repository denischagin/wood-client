import { Button, ButtonProps } from '@mui/material'
import { FC, useState } from 'react'
import { UpdateDryerModal } from '@/enitities/dryer'

export const UpdateDryerButton: FC<ButtonProps> = props => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  const handleCreateDryer = (dryer: unknown) => {
    handleCloseModal()
  }

  return (
    <>
      <Button variant='gray' size='small' onClick={handleOpenModal} {...props} />

      <UpdateDryerModal
        title={'Редактировать сушильную камеру'}
        action={'Редактировать'}
        onUpdate={handleCreateDryer}
        open={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}
