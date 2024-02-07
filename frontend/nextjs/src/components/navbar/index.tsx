import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import Image from 'next/legacy/image'
import Link from 'next/link'

// import { AuthService } from '../../services/auth.service'
// import { CategoryService } from '../../services/category.service'

import { SearchBar } from './search-bar'
import { SelectCategory } from './select-category'
import { UserMenu } from './user-menu'

export async function Navbar() {
  //const categories = await new CategoryService().getCategories()
  //const user = new AuthService().getUser()
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <Image src="/logo.png" width={147.66} height={63.66} alt="logo" priority />
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', ml: 1 }}>
          <SearchBar />
        </Box>
        <IconButton LinkComponent={Link} size="large" href="/my-cart">
          <ShoppingCartIcon />
        </IconButton>
        <UserMenu user={{}} />
      </Toolbar>
      <Toolbar
        sx={{
          alignContent: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          p: 1,
        }}>
        <SelectCategory categories={[]} />

        <Box
          component={Link}
          href={'/products'}
          sx={{ display: 'flex', ml: 3, textDecoration: 'none' }}>
          <HomeIcon sx={{ color: 'text.primary' }} />
          <Typography color="text.primary" sx={{ display: 'flex', fontWeight: 500 }}>
            Home
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
