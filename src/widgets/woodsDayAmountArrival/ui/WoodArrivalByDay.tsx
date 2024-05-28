import { FC, useState } from 'react'

import { Box, CircularProgress, IconButton, Skeleton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { AddWoodsArrival } from '@/features/arrival/add'
import { UpdateWoodsModal } from '@/entities/wood/ui/UpdateWoodsModal.tsx'
import { useFetchWoodArrivalQuery } from '@/entities/wood-arrival'
import { ButtonWithConfirm, CustomSunburst, EditIcon } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export interface WoodArrivalByDayProps {
  title?: string
  onUpdate?: (id: number) => void
  onDelete?: (id: number) => void
  selectedDate: string
  woodConditionId: number
}

export const WoodArrivalByDay: FC<WoodArrivalByDayProps> = ({
  title,
  onDelete,
  onUpdate,
  selectedDate,
  woodConditionId,
}) => {
  const [openEditId, setOpenEditId] = useState<number>()

  const { data: woodArrival, isLoading: isLoadingWoodArrival } = useFetchWoodArrivalQuery({
    woodConditionId,
    endDate: selectedDate,
    startDate: selectedDate,
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
      renderCell: ({ id }) => (
        <Box sx={{ ml: 'auto' }}>
          <IconButton onClick={() => handleOpenModal(id as number)}>
            <EditIcon />
          </IconButton>

          <UpdateWoodsModal
            title={'Редактировать'}
            actionTitle={'Редактировать'}
            onSubmit={() => onUpdate?.(id as number)}
            open={openEditId === id}
            onClose={handleCloseModal}
          />
          <ButtonWithConfirm
            header={'Удаление досок'}
            description={'Вы точно хотите удалить?'}
            onConfirm={() => onDelete?.(id as number)}
          />
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
            getRowId={row => row.woodClass + row.dimension}
          />
        )}
      </DataGridContainer>

      <Box display='flex' justifyContent='center' width='100%' px={5} mt={1}>
        {isLoadingWoodArrival && <Skeleton variant='circular' width='500px' height='500px' />}
        {woodArrival && (
          <CustomSunburst
            data={{ children: woodArrival.sunburstData }}
            id='name'
            value='size'
            arcLabel={({ id }) => `${id}`}
            valueFormat={value => value.toFixed(2) + ' м3'}
            containerProps={{
              width: '500px',
              height: '500px',
            }}
          >
            <Typography variant='h6' textAlign='center'>
              Всего из:
            </Typography>
            <Typography variant='h6' textAlign='center'>
              4.300 м3
            </Typography>
          </CustomSunburst>
        )}
      </Box>
    </Box>
  )
}
