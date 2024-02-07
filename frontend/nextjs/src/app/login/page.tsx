import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { redirect } from 'next/navigation'

import { loginAction } from '@/server-actions/auth.action'
import { AuthService } from '@/services/auth.service'
// import { Form } from "../../components/Form";

type Props = {
  searchParams: { redirect_to?: string }
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect_to = '/products' } = searchParams
  const authService = new AuthService()
  const user = authService.getUser()

  if (user && !authService.isTokenExpired()) {
    redirect(redirect_to)
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 8,
      }}>
      <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entre com sua conta
      </Typography>
      <form noValidate action={loginAction}>
        <Box sx={{ mt: 1 }}>
          <input type="hidden" name="redirect_to" value={redirect_to} />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            name="email"
            autoComplete="email"
            defaultValue={'john'}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            defaultValue={'john'}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2, mt: 3 }}>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  )
}
