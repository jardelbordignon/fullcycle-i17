import { randomUUID } from 'node:crypto'

import { Product } from './models'
import { Cart } from './services/cart.service'

const categoryIds = [randomUUID(), randomUUID()]
const productNames = [
  'Product ABC',
  'Product XYZ',
  'Product 123',
  'Product DEV',
  'Product TST',
  'Product HML',
  'Product PRD',
]

export const mockedProducts: Product[] = productNames.map((name, index) => ({
  category_id: categoryIds[index % 2],
  description: `${name} description`,
  id: randomUUID(),
  image_url: `https://picsum.photos/seed/${name}/200/300`,
  name,
  price: (index + 1) * 50,
}))

const productsInCart = mockedProducts.slice(1, 5)
export const mockedCart: Cart = {
  items: productsInCart.map(product => ({
    product_id: product.id,
    quantity: 1,
    total: product.price,
  })),
  total: productsInCart.reduce((acc, product) => acc + product.price, 0),
}
