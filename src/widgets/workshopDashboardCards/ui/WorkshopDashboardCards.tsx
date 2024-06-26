import { FC } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Grid, Skeleton, Typography } from '@mui/material'

import { EditWorkshopDimensionOfTheDay } from '@/features/workshop/edit-dimension-of-the-day'
import { EditWoodNamingOfTheDay } from '@/features/workshop/edit-wood-naming-of-the-day'
import { useFetchWorkshopDailyStatsQuery } from '@/entities/workshop'
import { DashItem } from '@/shared/ui'

type WorkshopDashboardCardsProps = {
  now: string
}

export const WorkshopDashboardCards: FC<WorkshopDashboardCardsProps> = ({ now }) => {
  const { workshopId } = useParams()
  const { data: workshopDailyData, isLoading: isLoadingWorkshopDailyData } =
    useFetchWorkshopDailyStatsQuery(
      { workshopId: workshopId ? Number(workshopId) : -1, date: now },
      { skip: !workshopId, refetchOnMountOrArgChange: true }
    )

  return (
    <Box display='flex' flexDirection='column' gap={3} width={'100%'}>
      <Grid container gap={3} flex='6'>
        <Grid item>
          {isLoadingWorkshopDailyData ? (
            <Skeleton sx={{ height: 178, width: '172px !important' }} variant='rounded' />
          ) : (
            <DashItem sx={{ backgroundColor: theme => theme.primary.purple }}>
              <Typography>Выручка: {workshopDailyData?.totalWoodPrice ?? 0}₽</Typography>
              <Typography>Сырье: {workshopDailyData?.priceOfRawMaterials ?? 0}₽</Typography>
              <Typography>Распиловка: {workshopDailyData?.sawingPrice ?? 0}₽</Typography>
              <Typography variant='h6' sx={{ mt: 3 }}>
                Итог: {workshopDailyData?.profit}₽
              </Typography>
            </DashItem>
          )}
        </Grid>

        <Grid item alignSelf='stretch' flex='6'>
          {isLoadingWorkshopDailyData ? (
            <Skeleton sx={{ height: 178, width: '100% !important' }} variant='rounded' />
          ) : (
            <DashItem
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme => theme.primary.blue,
              }}
            >
              <Box>
                <Typography variant='h6'>Итог на куб:</Typography>
                <Typography variant='subtitle1'>
                  {workshopDailyData?.profitPerUnit ?? 0}₽
                </Typography>
              </Box>
            </DashItem>
          )}
        </Grid>
      </Grid>

      {isLoadingWorkshopDailyData ? (
        <Skeleton sx={{ height: 115 }} variant='rounded' />
      ) : (
        <DashItem sx={{ backgroundColor: theme => theme.primary.purpleOpacity }}>
          <Typography variant='h6'>Сечение дня</Typography>
          <EditWorkshopDimensionOfTheDay
            dimensionOfTheDay={workshopDailyData?.dimensionOfTheDay}
            date={now}
            workshopId={Number(workshopId)}
          />
        </DashItem>
      )}

      {isLoadingWorkshopDailyData ? (
        <Skeleton sx={{ height: 115 }} variant='rounded' />
      ) : (
        <DashItem sx={{ backgroundColor: theme => theme.primary.purple }}>
          <Typography variant='h6'>Условное обозначение дня</Typography>
          <EditWoodNamingOfTheDay
            woodNamingOfTheDay={workshopDailyData?.woodNamingOfTheDay}
            date={now}
            workshopId={Number(workshopId)}
          />
        </DashItem>
      )}
    </Box>
  )
}
