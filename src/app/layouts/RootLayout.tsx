import { ModeSwitchButton } from '@/features/mode-switch'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        paddingLeft: '0!important',
        paddingRight: '0!important',
        maxWidth: '1820px!important',
      }}
      maxWidth='xl'
    >
      <Sidebar />

      <Box
        width='100%'
        height='100%'
        display='flex'
        flexDirection='column'
        borderRight={theme => '1px solid ' + theme.black[10]}
      >
        <Header />

        <Box component='main' width='100%' sx={{ p: 4, flexGrow: 1 }} overflow='auto'>
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}
