import { cookies } from 'next/headers'

export class AuthService {
  async login(input: { email: string; password: string }) {
    const response = await fetch(`${process.env.ORDERS_API_URL}/auth/login`, {
      body: JSON.stringify({
        password: input.password,
        username: input.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.status === 401) {
      return { error: 'Credenciais inválidas' }
    }

    if (!response.ok) {
      const error = await response.json()
      return { error }
    }

    const data = await response.json()

    const cookieStore = cookies()
    //cookie criptografado
    cookieStore.set('token', data.access_token)
  }

  logout() {
    const cookieStore = cookies()
    cookieStore.delete('token')
  }

  getUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    const payloadBase64 = token.split('.')[1]
    const payloadDecoded = Buffer.from(payloadBase64, 'base64').toString('utf-8')
    return JSON.parse(payloadDecoded)
  }

  getToken() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    return token
  }

  isTokenExpired() {
    const user = this.getUser()

    if (!user) {
      return true
    }

    const now = new Date()
    const exp = new Date(user.exp * 1000)

    return now > exp
  }
}
