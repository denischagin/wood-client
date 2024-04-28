import { Box } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { useNivoTheme } from '@/shared/libs/hooks'

export const WorkshopWoodsBar = () => {
  const nivoTheme = useNivoTheme()

  const data = [
    {
      day: '1 апр',
      'Крутая древесина': 10,
      'Хз древесина': 20,
    },
    {
      day: '2 апр',
      'Крутая древесина': 5,
      'Хз древесина': 1,
    },
    {
      day: '3 апр',
      'Крутая древесина': 20,
      'Хз древесина': 60,
    },
    {
      day: '4 апр',
      'Крутая древесина': 10,
      'Хз древесина': 20,
    },
    {
      day: '5 апр',
      'Крутая древесина': 5,
      'Хз древесина': 1,
    },
    {
      day: '6 апр',
      'Крутая древесина': 20,
      'Хз древесина': 60,
    },
  ]

  return (
    <Box height='300px' width='100%' borderRadius={4}>
      <ResponsiveBar
        data={data}
        keys={['Крутая древесина', 'Хз древесина']}
        indexBy='day'
        margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        axisTop={null}
        axisRight={null}
        theme={nivoTheme}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'День',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Количество',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        role='application'
        ariaLabel='Nivo bar chart demo'
        barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in day: ' + e.indexValue}
      />
    </Box>
  )
}
