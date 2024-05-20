import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { CreateWoodNamingButton } from '@/features/wood-naming/create'
import { UpdateWoodNamingButton } from '@/features/wood-naming/update'
import { ButtonWithConfirm } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'

export const TimberMarkingsTable = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 200 },
    {
      field: 'actions',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      width: 300,
      renderCell: () => (
        <>
          <UpdateWoodNamingButton sx={{ mr: 1 }} />
          <ButtonWithConfirm
            header='Редактировать обозначение'
            description='Вы точно хотите удалить это обозначение?'
            onConfirm={() => {
              console.log('delete timber marking')
            }}
          />
        </>
      ),
    },
  ]

  const rows = [
    { id: 1, name: 'Елка' },
    { id: 2, name: 'Сосна' },
    { id: 3, name: 'Береза' },
    { id: 4, name: 'Дуб' },
    { id: 5, name: 'Лиственница' },
    { id: 6, name: 'Ясень' },
    { id: 7, name: 'Клен' },
    { id: 8, name: 'Бук' },
    { id: 9, name: 'Вяз' },
    { id: 10, name: 'Ольха' },
    { id: 11, name: 'Рябина' },
    { id: 12, name: 'Осина' },
    { id: 13, name: 'Липа' },
    { id: 14, name: 'Черемуха' },
    { id: 15, name: 'Каштан' },
    { id: 16, name: 'Тополь' },
    { id: 17, name: 'Ива' },
    { id: 18, name: 'Пихта' },
    { id: 19, name: 'Кедр' },
    { id: 20, name: 'Можжевельник' },
  ]

  return (
    <Box display={'flex'} flexDirection='column'>
      <CreateWoodNamingButton sx={{ my: 4, alignSelf: 'end' }}>Добавить</CreateWoodNamingButton>

      <DataGridContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableMultipleRowSelection
          localeText={dataGridLocaleText}
          sx={dataGridStyles}
          hideFooter
          slots={{ panel: CustomGridPanel }}
        />
      </DataGridContainer>
    </Box>
  )
}
