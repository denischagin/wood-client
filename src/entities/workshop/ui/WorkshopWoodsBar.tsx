import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { mapDataToWoodsBar } from '@/entities/workshop/libs'
import { ColorItem, CustomBar, CustomTooltip } from '@/shared/ui'

export const WorkshopWoodsBar = () => {
  const mockData = useMemo(
    () => [
      {
        day: '1 апр',
        woods: [
          { name: 'Крутая древесина', count: 10 },
          { name: 'Хз древесина', count: 20 },
        ],
      },
      {
        day: '2 апр',
        woods: [
          { name: 'Крутая древесина', count: 5 },
          { name: 'Хз древесина', count: 1 },
        ],
      },
      {
        day: '3 апр',
        woods: [
          { name: 'Крутая древесина', count: 20 },
          { name: 'Хз древесина', count: 60 },
        ],
      },
      {
        day: '4 апр',
        woods: [
          { name: 'Крутая древесина', count: 10 },
          { name: 'Хз древесина', count: 20 },
        ],
      },
      {
        day: '5 апр',
        woods: [
          { name: 'Крутая древесина', count: 5 },
          { name: 'Хз древесина', count: 1 },
        ],
      },
      {
        day: '6 апр',
        woods: [
          { name: 'Крутая древесина', count: 20 },
          { name: 'Хз древесина', count: 60 },
        ],
      },
    ],
    []
  )

  const { items, keys } = useMemo(() => mapDataToWoodsBar(mockData), [mockData])

  return (
    <Box height='280px' width='100%' borderRadius={4}>
      <CustomBar
        data={items}
        keys={keys}
        indexBy='day'
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        margin={{ top: 10, right: 10, bottom: 25, left: 50 }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Количество',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        role='application'
        ariaLabel='woods bar chart'
        tooltip={({ formattedValue, id, color }) => (
          <CustomTooltip>
            <ColorItem bgcolor={color} />

            <Typography>
              {id} - {formattedValue}
            </Typography>
          </CustomTooltip>
        )}
      />
    </Box>
  )
}
