import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tagTypes = [
  'AllUsers',
  'Roles',
  'WoodNamings',
  'AllDimensions',
  'DimensionsByWoodClass',
  'AllWoodClasses',
  'AllWorkshops',
  'WorkshopWoodPrices',
  'Dryers',
  'DryersDataById',
]
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: () => ({}),
  tagTypes,
})
