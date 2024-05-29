import { FC } from 'react'

import { Typography } from '@mui/material'

import { WarehouseSunburstData } from '@/entities/warehouse'
import { CustomSunburst } from '@/shared/ui'

export interface DimensionProps {
  data: WarehouseSunburstData[]
  total: number
}

export const WarehouseSunburst: FC<DimensionProps> = ({ data }) => {
  return (
    <CustomSunburst
      data={{ children: data }}
      id='name'
      value='size'
      containerProps={{
        width: '750px',
        height: '750px',
      }}
      arcLabel={({ id }) => `${id}`}
      valueFormat={value => value.toFixed(2) + ' м3'}
      arcLabelsSkipAngle={6}
    >
      <Typography>Всего м3</Typography>
      <Typography>1225.34</Typography>
    </CustomSunburst>
  )
}
