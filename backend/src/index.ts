import { Hono } from 'hono'
import userRouter from './routes/routes'


const app = new Hono<{  //generics defining the types of environment url;
  Bindings: {
    POSTGRESS_URL: string,
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()

app.route('/api/v1', userRouter)



export default app
