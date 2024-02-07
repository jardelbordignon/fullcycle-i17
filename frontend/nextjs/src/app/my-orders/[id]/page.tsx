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
import { OrderStatus } from '@/models'
import { OrderServiceFactory } from '@/services/order.service'

export default async function MyOrderDetail({ params }: { params: { orderId: string } }) {
  const order = await OrderServiceFactory.create().getOrder(params.orderId)

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
              {order.status === OrderStatus.pending ? (
                <Typography variant="h1" sx={{ color: 'warning.main' }}>
                  ⏳
                </Typography>
              ) : order.status === OrderStatus.paid ? (
                <Typography variant="h1" sx={{ color: 'success.main' }}>
                  ✔
                </Typography>
              ) : (
                <Typography variant="h1" sx={{ color: 'error.main' }}>
                  ✖
                </Typography>
              )}
            </Box>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              {order.status === OrderStatus.pending
                ? 'Pedido pendente'
                : order.status === OrderStatus.paid
                  ? 'Pedido pago'
                  : 'Pedido cancelado'}
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
                      }).format(item.product.price)}
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
