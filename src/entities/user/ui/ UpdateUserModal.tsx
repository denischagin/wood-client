import { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import {
  Box,
  CircularProgress,
  MenuItem,
  Modal,
  ModalProps,
  TextField,
  Typography,
} from '@mui/material'

import { USER_ROLE } from '@/entities/user/contansts'
import { ModalContent, SelectPlaceholderWrapper } from '@/shared/ui'
import { ButtonWithLoader } from '@/shared/ui/button'

import { UserFormType } from '../model'

export interface UpdateUserModalProps extends Omit<ModalProps, 'children'> {
  onUpdate: SubmitHandler<UserFormType>
  title: string
  action: string
  methods: UseFormReturn<UserFormType>
  roleOptions:
    | {
        id: number
        name: USER_ROLE
      }[]
    | undefined
  isUserRolesLoading: boolean
  isLoading: boolean
}

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  title,
  open,
  action,
  onUpdate,
  methods,
  roleOptions,
  isUserRolesLoading,
  isLoading,
  ...modalProps
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const watchRole = watch('role')
  const watchRepeatPassword = watch('repeatPassword')

  return (
    <Modal {...modalProps} open={open} aria-labelledby='create-user-modal-title'>
      <ModalContent>
        <Typography
          id='create-user-modal-title'
          variant='h5'
          component='h2'
          sx={{ textAlign: 'center', mb: 5 }}
        >
          {title}
        </Typography>

        <Box
          component='form'
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmit(onUpdate)}
        >
          <TextField
            inputProps={{ ...register('secondName', { minLength: 3, required: true }) }}
            id='secondName'
            label='Фамилия'
            variant='outlined'
            size='small'
            error={Boolean(errors.secondName)}
          />
          {errors.secondName?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина фамилии должна быть минимум 2 символа
            </Typography>
          )}
          {errors.secondName?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Фамилия обязательна
            </Typography>
          )}

          <TextField
            inputProps={{ ...register('firstName', { minLength: 2, required: true }) }}
            id='firstName'
            label='Имя'
            variant='outlined'
            size='small'
            error={Boolean(errors.firstName)}
          />
          {errors.firstName?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина имени должна быть минимум 2 символа
            </Typography>
          )}
          {errors.firstName?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Имя обязательно
            </Typography>
          )}

          <TextField
            inputProps={{ ...register('fatherName', { minLength: 3, required: true }) }}
            id='fatherName'
            label='Отчество'
            variant='outlined'
            size='small'
            error={Boolean(errors.fatherName)}
          />
          {errors.fatherName?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина отчества должна быть минимум 3 символа
            </Typography>
          )}
          {errors.fatherName?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Отчество обязательно
            </Typography>
          )}

          <TextField
            inputProps={{ ...register('login', { minLength: 3, required: true }) }}
            id='login'
            label='Логин'
            variant='outlined'
            size='small'
            error={Boolean(errors.login)}
          />
          {errors.login?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина логина должна быть минимум 3 символа
            </Typography>
          )}
          {errors.login?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Логин обязателен
            </Typography>
          )}

          {isUserRolesLoading ? (
            <CircularProgress size={15} />
          ) : (
            <SelectPlaceholderWrapper shouldShowPlaceholder={!watchRole} placeholderText='Роль'>
              <TextField
                select
                defaultValue={watchRole}
                sx={{ width: '100%' }}
                inputProps={{ ...register('role', { required: true }) }}
                size='small'
                error={Boolean(errors.role)}
              >
                {roleOptions?.map(roleOption => {
                  return <MenuItem value={roleOption.name}>{roleOption.name}</MenuItem>
                })}
              </TextField>
            </SelectPlaceholderWrapper>
          )}
          {errors.role?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Роль обязательна
            </Typography>
          )}

          <TextField
            inputProps={{
              ...register('password', {
                minLength: 6,
                required: true,
                validate: value => {
                  if (value !== watchRepeatPassword) {
                    return 'Пароли должны совпадать'
                  }
                },
              }),
            }}
            id='password'
            type='password'
            label='Пароль'
            variant='outlined'
            size='small'
            error={Boolean(errors.password)}
          />
          {errors.password?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина пароля должна быть минимум 6 символов
            </Typography>
          )}
          {errors.password?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Пароль обязателен
            </Typography>
          )}
          {errors.password?.type === 'validate' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              {errors.password?.message}
            </Typography>
          )}

          <TextField
            inputProps={{
              ...register('repeatPassword', {
                minLength: 6,
                required: true,
              }),
            }}
            id='repeatPassword'
            type='password'
            label='Повторите Пароль'
            variant='outlined'
            size='small'
            error={Boolean(errors.repeatPassword)}
          />
          {errors.repeatPassword?.type === 'minLength' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Длина пароля должна быть минимум 6 символов
            </Typography>
          )}
          {errors.repeatPassword?.type === 'required' && (
            <Typography variant='caption' sx={{ color: theme => theme.palette.error.main }}>
              Повтор пароля обязателен
            </Typography>
          )}

          <ButtonWithLoader
            isLoading={isLoading}
            type='submit'
            sx={{ mt: 5 }}
            variant='contained'
            color='primary'
          >
            {action}
          </ButtonWithLoader>
        </Box>
      </ModalContent>
    </Modal>
  )
}
