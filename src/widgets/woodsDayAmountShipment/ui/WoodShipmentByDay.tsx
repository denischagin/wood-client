import { FC, useState } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { AddWoodsShipment } from '@/features/shipment/add'
import { DeleteShipmentButton } from '@/features/shipment/delete'
import { UpdateShipmentButton } from '@/features/shipment/update'
import { WoodAmountByDaySunburst } from '@/entities/wood'
import { useFetchWoodShipmentByDayQuery } from '@/entities/wood-shipment'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodShipmentByDayProps {
  title?: string
  selectedDate: string
  woodConditionId: number
}

export const WoodShipmentByDay: FC<WoodShipmentByDayProps> = ({
  title,
  selectedDate,
  woodConditionId,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const { data: woodShipment, isLoading: isLoadingWoodShipment } = useFetchWoodShipmentByDayQuery({
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
          <UpdateShipmentButton
            onClick={() => handleOpenModal(id as number)}
            isOpen={openEditId === id}
            onClose={handleCloseModal}
            shipmentId={id as number}
            dimension={row.dimension}
            woodClass={row.woodClass}
            amount={row.amount}
          />
          <DeleteShipmentButton id={id as number} onClose={handleCloseModal} />
        </Box>
      ),
    },
  ]

  return (
    <Box overflow='hidden'>
      <Box display='flex' justifyContent='space-between' mb={3}>
        <Typography>{title}</Typography>

        <AddWoodsShipment
          title='Добавить доски на отгрузку'
          woodConditionId={woodConditionId}
          selectedDate={selectedDate}
        />
      </Box>

      <DataGridContainer height='400px' width='600px'>
        {isLoadingWoodShipment && (
          <Box sx={{ width: '100%', height: '80%', display: 'grid', placeContent: 'center' }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {woodShipment?.tableData && (
          <DataGrid
            rows={woodShipment.tableData}
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

      {woodShipment && (
        <WoodAmountByDaySunburst
          isLoading={isLoadingWoodShipment}
          data={woodShipment.sunburstData}
          total={woodShipment.totalVolume}
        />
      )}
    </Box>
  )
}