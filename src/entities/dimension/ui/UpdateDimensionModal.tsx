import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { CircularProgress, MenuItem, Modal, ModalProps, TextField, Typography } from '@mui/material'

import { ModalContent, SelectPlaceholderWrapper } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { DimensionFormType } from '../model'

export interface UpdateDimensionModalProps extends Omit<ModalProps, 'children'> {
  title: string
  action: string
  onUpdate: SubmitHandler<DimensionFormType>
  methods: UseFormReturn<DimensionFormType>
  woodClassesOptions:
    | {
        id: number
        name: string
      }[]
    | undefined
  isWoodClassesLoading: boolean
  isLoading: boolean
}

export const UpdateDimensionModal: FC<UpdateDimensionModalProps> = ({
  title,
  action,
  onUpdate,
  methods,
  woodClassesOptions,
  isWoodClassesLoading,
  isLoading,
  ...modalProps
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const watchWoodClass = watch('woodClass')

  return (
    <Modal {...modalProps}>
      <ModalContent
        component='form'
        onSubmit={handleSubmit(onUpdate)}
        display='flex'
        flexDirection='column'
        gap={3}
      >
        <Typography variant='h6' sx={{ textAlign: 'center', mb: 1 }}>
          {title}
        </Typography>

        <TextField
          inputProps={{ ...register('width', { required: true }) }}
          type='number'
          label='Ширина (мм)'
          size='small'
          error={Boolean(errors.width)}
        />
        {errors.width?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Ширина обязательна
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('thickness', { required: true }) }}
          type='number'
          label='Толщина (мм)'
          size='small'
          error={Boolean(errors.thickness)}
        />
        {errors.thickness?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Толщина обязательна
          </Typography>
        )}

        <TextField
          inputProps={{ ...register('length', { required: true }) }}
          type='number'
          label='Длина (м)'
          size='small'
          error={Boolean(errors.length)}
        />
        {errors.length?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Длина обязательна
          </Typography>
        )}

        {isWoodClassesLoading ? (
          <CircularProgress size={15} />
        ) : (
          <SelectPlaceholderWrapper shouldShowPlaceholder={!watchWoodClass} placeholderText='Сорт'>
            <TextField
              inputProps={{ ...register('woodClass', { required: true }) }}
              select
              defaultValue={watchWoodClass}
              sx={{ width: '100%' }}
              size='small'
              error={Boolean(errors.woodClass)}
            >
              {woodClassesOptions?.map(woodClassOption => {
                return <MenuItem value={woodClassOption.name}>{woodClassOption.name}</MenuItem>
              })}
            </TextField>
          </SelectPlaceholderWrapper>
        )}
        {errors.woodClass?.type === 'required' && (
          <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
            Сорт обязателен
          </Typography>
        )}

        <ButtonWithLoader isLoading={isLoading} type='submit' variant='contained'>
          {action}
        </ButtonWithLoader>
      </ModalContent>
    </Modal>
  )
}
