import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { FC } from 'react'

type DatePickerProps = {
  // Custom props here
} & MobileDatePickerProps<Dayjs, boolean>

export const DatePicker: FC<DatePickerProps> = ({ ...props }) => {
  return (
    <MobileDatePicker
      format={'DD.MM.YYYY'}
      label={'День, месяц и год'}
      views={['year', 'month', 'day']}
      {...props}
    />
  )
}
