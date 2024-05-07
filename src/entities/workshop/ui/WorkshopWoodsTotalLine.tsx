import { useMemo } from 'react'

import { ResponsiveLine, Serie } from '@nivo/line'

import { Box } from '@mui/material'

import { shortRuDateFormater } from '@/shared/constants'
import { useNivoTheme } from '@/shared/libs/hooks'

const data = [
  { date: '2024-04-01', price: 30 },
  { date: '2024-04-02', price: 20 },
  { date: '2024-04-03', price: 30 },
  { date: '2024-04-04', price: 40 },
  { date: '2024-04-05', price: 30 },
]

export const WorkshopWoodsTotalLine = () => {
  const nivoTheme = useNivoTheme()

  const min = useMemo(() => Math.min(...data.map(item => item.price)), [data])
  const max = useMemo(() => Math.min(...data.map(item => item.price)), [data])

  const series: Serie[] = useMemo(
    () => [
      {
        id: 'WorkshopWoodsDiametersLine',
        data: data.map(datum => ({
          x: shortRuDateFormater.format(new Date(datum.date)),
          y: datum.price,
        })),
      },
    ],
    [data]
  )

  return (
    <Box height={300} width={'100%'}>
      <ResponsiveLine
        data={series}
        theme={nivoTheme}
        margin={{ top: 10, right: 20, bottom: 50, left: 60 }}
        yScale={{
          type: 'linear',
          min: min - 40,
          max: max + 40,
          stacked: true,
          reverse: false,
        }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
          format: string => string + 'р.',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='data.yFormatted'
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        enablePoints={false}
        colors={{ scheme: 'paired' }}
      />
    </Box>
  )
}
