import { useMemo, useState } from 'react'

import { Box, CircularProgress, Modal, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useFetchAllDimensionsQuery } from '@/entities/dimension'
import { ModalContent } from '@/shared/ui'
import {
  CustomGridPanel,
  DataGridContainer,
  DataGridFullscreenButton,
  dataGridLocaleText,
  dataGridStyles,
} from '@/shared/ui/data-grid'
import { ModalCloseButton } from '@/shared/ui/modal'

export const ReferenceBook = () => {
  const columns: GridColDef[] = [
    { field: 'width', headerName: 'Ширина (мм)', width: 200 },
    { field: 'thickness', headerName: 'Толщина (мм)', width: 200 },
    { field: 'length', headerName: 'Длина (м)', width: 200 },
    { field: 'volume', headerName: 'Объем (м3)', width: 200 },
    { field: 'woodClassName', headerName: 'Сорт', width: 200 },
  ]

  const { data: dimensions, isLoading: isLoadingDimensions } = useFetchAllDimensionsQuery()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }

  const rows = useMemo(
    () =>
      dimensions?.map(dimension => ({
        id: dimension.id,
        width: dimension.width,
        thickness: dimension.thickness,
        length: dimension.length,
        volume: dimension.volume,
        woodClassName: dimension.woodClass.name,
      })),
    [dimensions]
  )

  return (
    <Box>
      <Typography variant='h5'>Справочник</Typography>

      <Box display={'flex'} flexDirection='column' mt={10}>
        <DataGridContainer>
          <DataGridFullscreenButton onClick={handleOpen} />
          {isLoadingDimensions && (
            <Box sx={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center' }}>
              <CircularProgress size={100} />
            </Box>
          )}
          {rows && (
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
          )}
        </DataGridContainer>
      </Box>

      <Modal open={isOpen} onClose={handleClose}>
        <ModalContent fullscreen>
          <ModalCloseButton onClick={handleClose} />
          <DataGridContainer height='90vh'>
            {isLoadingDimensions && (
              <Box sx={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center' }}>
                <CircularProgress size={100} />
              </Box>
            )}
            {rows && (
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
            )}
          </DataGridContainer>
        </ModalContent>
      </Modal>
    </Box>
  )
}
