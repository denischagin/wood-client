import { FC, ReactNode, useState } from 'react'

import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'

import { TrashIcon } from '@/shared/ui'

export interface ButtonWithConfirmProps extends ButtonProps {
  header: string
  description: string
  submitText?: string
  cancelText?: string
  onConfirm: () => void
  renderButton?: (props: { onClick: () => void }) => ReactNode
}

export const ButtonWithConfirm: FC<ButtonWithConfirmProps> = props => {
  const { onConfirm, header, description, submitText, cancelText, renderButton, ...buttonProps } =
    props

  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const handleCloseAlert = () => setIsOpenAlert(false)
  const handleOpenAlert = () => setIsOpenAlert(true)

  const handleSubmit = () => {
    handleCloseAlert()
    onConfirm()
  }

  return (
    <>
      {renderButton ? (
        renderButton({ onClick: handleOpenAlert })
      ) : (
        <IconButton onClick={handleOpenAlert} {...buttonProps}>
          <TrashIcon />
        </IconButton>
      )}

      <Dialog
        open={isOpenAlert}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>{submitText || 'Удалить'}</Button>
          <Button onClick={handleCloseAlert} variant='gray' autoFocus>
            {cancelText || 'Отмена'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
