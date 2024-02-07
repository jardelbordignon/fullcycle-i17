import PaidIcon from '@mui/icons-material/Paid'
import { Chip } from '@mui/material'

type Props = { data: number }

export function Total({ data }: Props) {
  return (
    <Chip
      label={`Total - ${new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(data)}`}
      sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
      color="primary"
      icon={<PaidIcon />}
    />
  )
}
