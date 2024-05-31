import { Box, Skeleton, Typography } from '@mui/material'

import { DashItem, DashboardTitle } from '@/shared/ui'
import { useFetchDryerStatsQuery } from '@/entities/dryer'

export const DryersDashboard = () => {
  const { data: dryerStats, isLoading: isLoadingDryerStats } = useFetchDryerStatsQuery()

  return (
    <Box>
      <DashboardTitle>Общие данные по сушилкам</DashboardTitle>
      <Box display='flex' gap={3} flexWrap='wrap' justifyContent='space-between'>
        {isLoadingDryerStats && <Skeleton variant='rounded' sx={{ width: 771, height: 378 }} />}

        {dryerStats &&
          dryerStats.map(dryerStat => {
            const sorts = Object.keys(dryerStat.sorts)
              .filter(woodClass => {
                return dryerStat.sorts[woodClass] !== 0
              })
              .map(woodClass => {
                return {
                  title: woodClass,
                  value: dryerStat.sorts[woodClass],
                }
              })

            return (
              <DashItem
                width={'31.2%'}
                height={100}
                sx={{
                  '&:nth-child(2n)': {
                    backgroundColor: theme => theme.primary.purpleOpacity,
                  },
                  '&:nth-child(2n+1)': {
                    backgroundColor: theme => theme.primary.blue,
                  },
                }}
              >
                <Box mb={1} key={dryerStat.dryerId}>
                  <Typography fontWeight='bold' variant='subtitle1'>
                    {dryerStat.dryerName}
                  </Typography>
                  {sorts.length ? (
                    sorts.map(sort => (
                      <Typography key={sort.title}>
                        {sort.title}: {sort.value} м3
                      </Typography>
                    ))
                  ) : (
                    <Typography>Пусто</Typography>
                  )}
                </Box>
              </DashItem>
            )
          })}
      </Box>
    </Box>
  )
}
