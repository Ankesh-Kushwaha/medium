import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'


const signUp = async (c:any) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
      const body = await c.req.json();
    
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        }
      })
    
      if (user) {
        return c.json({
          success: false,
          message: "user already exists"
        }, 401)
      }
    
      // Hashing password before storing to database
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(body.password, salt);
    
      const newUser = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword
        },
      })
        
    
      const jwt = await sign({
        id: newUser.id,
        name: newUser.name,
        password: newUser.password
      }, c.env.JWT_SECRET);
    
      return c.json({
        message: "user created successfully",
        jwt: jwt
      }, 200);
    }
    catch (err: any) {
      console.error(err)
      return c.json({
        error: err.message || "Internal Server Error",
      }, 500)
    }
  }

const signIn = async (c:any) => {
    // console.log('jwt : ', c.env.JWT_SECRET)
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
      const body = await c.req.json()

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      })

      if (!user) {
        return c.json({
          success: false,
          message: "User does not exist",
        }, 402)
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)

      return c.json({
        success: true,
        message: "Signin successful",
        jwt: jwt,
      }, 200)
    } catch (err) {
      console.log("error", err)
      return c.json({
        success: false,
        message: "Internal server error",
        error: err,
      }, 500)
    }
  
}


const createBlog = async (c:any) => {
  
}

const updateBlog = async (c:any) => {
  
}

const getSingleBlog = async (c:any) => {
  
}

const getAllBlog = async (c:any) => {
  
}

export {
  signIn,
  signUp,
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog
}