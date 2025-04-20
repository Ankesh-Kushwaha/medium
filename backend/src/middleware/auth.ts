import { MiddlewareHandler } from 'hono'
import { verify } from 'hono/jwt'


export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return c.json({ message: 'Unauthorized: No token provided' }, 401)
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    c.set('user', payload)  // attach user info to context we can set the user information through this 
    await next()  // call next middleware / route handler
  } catch (e) {
    return c.json({ message: 'Unauthorized: Invalid token' }, 401)
  }
}

