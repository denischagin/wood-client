import { FC, useMemo } from 'react'

import { skipToken } from '@reduxjs/toolkit/query'

import { Box, Skeleton } from '@mui/material'

import { VaultItem } from '@/entities/vault'
import { useFetchWoodArrivalByRangeQuery } from '@/entities/wood-arrival'
import { useFetchAllWoodConditionsQuery } from '@/entities/wood-condition'
import { useFetchWoodShipmentByRangeQuery } from '@/entities/wood-shipment'
import { useFetchWorkshopProducedStatsQuery } from '@/entities/workshop-out'

export type WetWoodVaultStatsProps = {
  startDate: string
  endDate: string
}

export const WetWoodVaultStats: FC<WetWoodVaultStatsProps> = ({ startDate, endDate }) => {
  const { data: woodConditions, isLoading: isLoadingWoodConditions } =
    useFetchAllWoodConditionsQuery()

  const wetWoodCondition = useMemo(() => {
    return woodConditions?.find(condition => condition.name === 'Сырая')
  }, [woodConditions])

  const { data: workshopProducedStats, isLoading: isLoadingWorkshopProduced } =
    useFetchWorkshopProducedStatsQuery({
      startDate,
      endDate,
    })
  const { data: woodArrivalByRange, isLoading: isLoadingWoodArrival } =
    useFetchWoodArrivalByRangeQuery(
      wetWoodCondition
        ? {
            startDate,
            endDate,
            woodConditionId: wetWoodCondition.id,
          }
        : skipToken
    )
  const { data: woodShipmentByRange, isLoading: isLoadingWoodShipment } =
    useFetchWoodShipmentByRangeQuery(
      wetWoodCondition
        ? {
            startDate,
            endDate,
            woodConditionId: wetWoodCondition.id,
          }
        : skipToken
    )

  const isLoading =
    isLoadingWorkshopProduced ||
    isLoadingWoodArrival ||
    isLoadingWoodConditions ||
    isLoadingWoodShipment

  return (
    <Box display='flex' gap={3} mt={5} flexWrap='wrap' justifyContent='space-evenly'>
      {isLoading && (
        <>
          <Skeleton variant='circular' width='700px' height='700px' />
          <Skeleton variant='circular' width='700px' height='700px' />
          <Skeleton variant='circular' width='700px' height='700px' />
        </>
      )}
      {workshopProducedStats && (
        <VaultItem title='Произвели' sunburstData={workshopProducedStats.sunburstData} />
      )}
      {woodArrivalByRange && (
        <VaultItem title='Поступило' sunburstData={woodArrivalByRange.sunburstData} />
      )}
      {woodShipmentByRange && (
        <VaultItem title='Отгрузили' sunburstData={woodShipmentByRange.sunburstData} />
      )}
    </Box>
  )
}
