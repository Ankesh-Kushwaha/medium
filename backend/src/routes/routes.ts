import { Hono } from 'hono';
import { signIn, signUp, createBlog, updateBlog, getAllBlog, getSingleBlog,deleteAll } from '../controllers/mainController'
import { authMiddleware } from  '../middleware/auth';

const userRouter = new Hono<{  //generics defining the types of environment url;
  Bindings: {
    POSTGRESS_URL: string,
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

userRouter.use(authMiddleware); //protect the route beyond this 
userRouter.post('/blog',createBlog);
userRouter.put('/blog/:id',updateBlog);
userRouter.get('/get/:id',getSingleBlog);
userRouter.get('/bulk', getAllBlog);
userRouter.delete('/delete', deleteAll);

export default userRouter;

