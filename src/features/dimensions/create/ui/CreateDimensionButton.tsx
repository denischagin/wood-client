import { forwardRef, useState } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { UpdateDimensionPriceModal } from '@/entities/dimension'

export const CreateDimensionButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const handleUpdateDimension = () => {
      console.log('update-params dimensions')
      handleClose() // TODO update dimension
    }

  return (
    <>
      <Button variant='gray' ref={ref} onClick={handleOpen} {...props} />

      <UpdateDimensionPriceModal
        title={'Создать сечение'}
        action={'Создать'}
        onUpdate={handleUpdateDimension}
        open={isOpen}
        onClose={handleClose}
      />
    </>
  )
})
