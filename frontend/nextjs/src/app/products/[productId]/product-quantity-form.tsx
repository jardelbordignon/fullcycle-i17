'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, Button, Divider, Slider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import { Total } from '@/components'
import { Product } from '@/models'
import { addToCartAction } from '@/server-actions/cart.action'

const schema = z
  .object({
    product_id: z.string().uuid(),
    quantity: z.number().int().min(1),
  })
  .required()

export function ProductQuantityForm(props: { product: Product }) {
  const { product } = props

  const { control, getValues, register, watch } = useForm({
    defaultValues: {
      product_id: product.id,
      quantity: 1,
    },
    resolver: zodResolver(schema),
  })

  const [total, setTotal] = useState(product.price * getValues()['quantity'])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'quantity' || name?.includes('attributes')) {
        setTotal(product.price * getValues()['quantity'])
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, product, getValues])

  return (
    <Box component="form" sx={{ p: 1 }} action={addToCartAction}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ display: 'flex' }}>
          <SettingsSuggestIcon />
          <Typography variant="h6">Configure sua compra</Typography>
        </Box>
        <Box display={{ md: 'block', xs: 'none' }}>
          <Total data={total} />
        </Box>
      </Box>
      <input type="hidden" value={props.product.id} {...register('product_id')} />
      <Controller
        name="quantity"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <Box sx={{ mt: 1 }}>
            <Typography>Quantidade</Typography>
            <Slider
              sx={{ mt: 5 }}
              valueLabelDisplay="on"
              step={1}
              marks
              min={1}
              max={10}
              {...field}
            />
          </Box>
        )}
      />
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
        <Button type="submit" sx={{ mt: 3 }} startIcon={<ShoppingCartIcon />}>
          Colocar no carrinho
        </Button>
      </Box>
    </Box>
  )
}
