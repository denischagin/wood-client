import { Typography } from '@mui/material'

import { CustomSunburst } from '@/shared/ui'

export const DryerConditionSunburst = () => {
  const data = {
    name: 'root',
    children: [
      {
        name: 'Дуб',
        children: [
          {
            name: '100x100x10',
            size: 10,
          },
          {
            name: '100x100x10',
            size: 15,
          },
          {
            name: '100x100x10',
            size: 20,
          },
        ],
      },
      {
        name: 'Сосна',
        children: [
          {
            name: '100x100x10',
            size: 10,
          },
          {
            name: '100x100x10',
            size: 15,
          },
          {
            name: '100x100x10',
            size: 20,
          },
        ],
      },
      {
        name: 'Береза',
        children: [
          {
            name: '100x100x10',
            size: 10,
          },
          {
            name: '100x100x10',
            size: 15,
          },
          {
            name: '100x100x10',
            size: 20,
          },
        ],
      },
    ],
  }

  return (
    <CustomSunburst
      value='size'
      id='name'
      data={data}
      containerProps={{
        width: '650px',
        height: '650px',
      }}
      arcLabel={({ id }) => `${id}`}
      valueFormat={value => value.toFixed(2) + ' м3'}
    >
      <Typography textAlign='center'>Всего</Typography>
      <Typography textAlign='center'>80.784 м3</Typography>
    </CustomSunburst>
  )
}
