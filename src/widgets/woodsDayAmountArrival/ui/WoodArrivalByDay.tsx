import { FC, useState } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { AddWoodsArrival } from '@/features/arrival/add'
import { DeleteArrivalButton } from '@/features/arrival/delete'
import { UpdateArrivalButton } from '@/features/arrival/update'
import { WoodAmountByDaySunburst } from '@/entities/wood'
import { useFetchWoodArrivalByDayQuery } from '@/entities/wood-arrival'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodArrivalByDayProps {
  title?: string
  selectedDate: string
  woodConditionId: number
}

export const WoodArrivalByDay: FC<WoodArrivalByDayProps> = ({
  title,
  selectedDate,
  woodConditionId,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const { data: woodArrival, isLoading: isLoadingWoodArrival } = useFetchWoodArrivalByDayQuery({
    woodConditionId,
    date: selectedDate,
  })

  const handleOpenModal = (id: number) => setOpenEditId(id)
  const handleCloseModal = () => setOpenEditId(undefined)

  const columns: GridColDef[] = [
    { field: 'dimension', headerName: 'Сечение', width: 150 },
    { field: 'woodClass', headerName: 'Сорт', width: 100 },
    { field: 'amount', headerName: 'Кол-во', width: 100 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      renderCell: ({ id, row }) => (
        <Box sx={{ ml: 'auto' }}>
          <UpdateArrivalButton
            onClick={() => handleOpenModal(id as number)}
            isOpen={openEditId === id}
            onClose={handleCloseModal}
            arrivalId={id as number}
            dimension={row.dimension}
            woodClass={row.woodClass}
            amount={row.amount}
          />
          <DeleteArrivalButton id={id as number} onClose={handleCloseModal} />
        </Box>
      ),
    },
  ]

  return (
    <Box overflow='hidden'>
      <Box display='flex' justifyContent='space-between' mb={3}>
        <Typography>{title}</Typography>

        <AddWoodsArrival
          woodConditionId={woodConditionId}
          title='Добавить доски на поступление'
          selectedDate={selectedDate}
        />
      </Box>

      <DataGridContainer height='400px' width='600px'>
        {isLoadingWoodArrival && (
          <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {woodArrival?.tableData && (
          <DataGrid
            rows={woodArrival.tableData}
            columns={columns}
            disableRowSelectionOnClick
            disableMultipleRowSelection
            localeText={dataGridLocaleText}
            sx={dataGridStyles}
            hideFooter
            slots={{ panel: CustomGridPanel }}
          />
        )}
      </DataGridContainer>

      {woodArrival && (
        <WoodAmountByDaySunburst
          isLoading={isLoadingWoodArrival}
          data={woodArrival.sunburstData}
          total={woodArrival.totalVolume}
        />
      )}
    </Box>
  )
}
