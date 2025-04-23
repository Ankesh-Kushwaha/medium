import { Hono } from 'hono'
import userRouter from './routes/routes'
import {cors} from 'hono/cors'


const app = new Hono<{  //generics defining the types of environment url;
  Bindings: {
    POSTGRESS_URL: string,
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()
app.use('/*', cors());
app.route('/api/v1', userRouter) //routing in hono



export default app
