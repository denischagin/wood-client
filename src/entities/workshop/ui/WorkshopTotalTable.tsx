import { FC, useMemo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Box, CircularProgress } from '@mui/material'
import { DataGrid, GridEventListener } from '@mui/x-data-grid'

import { useFetchWorkshopReportQuery } from '@/entities/workshop-out'
import { TimeRange } from '@/shared/types'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

import { WORKSHOP_TOTAL_TABLE_COLUMNS } from '../constants'
import dayjs from 'dayjs'
import { urls } from '@/shared/constants'

type WorkshopTotalTableProps = {
  timeRange: TimeRange
}

export const WorkshopTotalTable: FC<WorkshopTotalTableProps> = ({ timeRange }) => {
  const { workshopId } = useParams()
  const navigate = useNavigate()

  const { data: workshopOutReportData, isLoading: isLoadingWorkshopOutReport } =
    useFetchWorkshopReportQuery({
      workshopId: workshopId ? Number(workshopId) : -1,
      startDate: timeRange.startDate.toISOString(),
      endDate: timeRange.endDate.toISOString(),
    })

  const rows = useMemo(() => {
    if (!workshopOutReportData) {
      return []
    }

    return workshopOutReportData.map(reportItem => {
      return { ...reportItem, date: dayjs(reportItem.date).format('DD.MM.YYYY') }
    })
  }, [workshopOutReportData])

  const handleRowDoubleClick: GridEventListener<'rowDoubleClick'> = event => {
    navigate(`/${urls.workshop}/${workshopId}/${urls.day}?date=${event.row.date}`)
  }

  return (
    <DataGridContainer
      sx={{
        display: 'flex',
        backgroundColor: theme =>
          theme.palette.mode === 'light' ? theme.background.main : theme.white[100],
      }}
    >
      {isLoadingWorkshopOutReport && (
        <Box sx={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      )}
      {workshopOutReportData && (
        <DataGrid
          rows={rows}
          columns={WORKSHOP_TOTAL_TABLE_COLUMNS}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={{ ...dataGridStyles, width: 400 }}
          hideFooter
          slots={{ panel: CustomGridPanel }}
          onRowDoubleClick={handleRowDoubleClick}
        />
      )}
    </DataGridContainer>
  )
}
