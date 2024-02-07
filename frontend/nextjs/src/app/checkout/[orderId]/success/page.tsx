import CheckIcon from '@mui/icons-material/Check'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import { Total } from '@/components'
import { OrderServiceFactory } from '@/services/order.service'

type Props = { params: { orderId: string } }

export default async function CheckoutSuccessPage({ params }: Props) {
  const orderService = OrderServiceFactory.create()
  const order = await orderService.getOrder(params.orderId)

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <CheckIcon sx={{ color: 'success.main', fontSize: 150, mr: 2 }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Pedido realizado com sucesso!
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd.</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      }).format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Total data={order.total} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  )
}
