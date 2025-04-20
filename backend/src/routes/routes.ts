import { Hono } from 'hono';
import {signIn,signUp,createBlog,updateBlog,getAllBlog,getSingleBlog} from '../controllers/mainController'

const userRouter = new Hono<{  //generics defining the types of environment url;
  Bindings: {
    POSTGRESS_URL: string,
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.post('/blog',createBlog);
userRouter.put('/blog:id',updateBlog);
userRouter.get('/get:id',getSingleBlog);
userRouter.get('/bulk',getAllBlog);

export default userRouter;

