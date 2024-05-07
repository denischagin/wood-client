import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateUserModal } from '@/entities/user'

export const CreateUserButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => setIsOpenModal(true)
  const handleCloseModal = () => setIsOpenModal(false)

  // TODO user modal
  const handleCreateUser = () => {}

  return (
    <>
      <Button ref={ref} variant='gray' size='medium' onClick={handleOpenModal} {...props} />

      <UpdateUserModal
        open={isOpenModal}
        onClose={handleCloseModal}
        onUpdate={handleCreateUser}
        action='Создать'
        title={`Создать пользователя`}
      />
    </>
  )
})
