export type Dryer = {
  id: number
  name: string
  chamberIterationCount: number
}

export type DryerDataItem = {
  name: string
  size: number
}

export type DryerDataResponse = {
  data: DryerDataItem[]
  total: number
}

export type DryerDataList = {
  sunburstData: DryerDataListSunburstDataItem[]
  totalVolume: number
}

type DryerDataListSunburstItem = {
  name: string
  children: { name: string; size: number }[]
}

type DryerDataListSunburstDataItem = {
  name: string
  children: DryerDataListSunburstItem[]
}

export type DryerFormType = {
  name: string
}

export type CreateDryerParams = {
  name: string
}

export type UpdateDryerParams = {
  id: number
  name: string
}

export type DryerDataParams = {
  woodClassId: number
  dimensionId: number
  woodTypeId: number
  date: string
  amount: number
  dryerChamberId: number
}

export type DryerBringInFormType = {
  woods: {
    woodClassId: number | undefined
    dimensionId: number | undefined
    woodTypeId: number | undefined
    amount: number
  }[]
}

export type BringWoodInDryerParams = {
  dryerChamberId: number
  woods: Omit<DryerDataParams, 'dryerChamberId'>[]
}

export type DryerStatsData = {
  dryerId: number
  dryerName: string
  sorts: Record<string, number>
  totalVolume: number
}

export type DryerStats = DryerStatsData[]
