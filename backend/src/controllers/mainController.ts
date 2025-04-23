import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import {signinInput,signupInput,createBlogInput,blogUpdate} from '@heisenberg_11/medium-common'



const signUp = async (c:any) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
      const body = await c.req.json();
      //body should be sanatize here we need zod validation
      //{ "email":string,"password":string}
      const success = signupInput.safeParse(body);
      if (!success) {
        return c.json({
          success: false,
          message: "zod validation error",
          },402)
      }
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
      const success = signinInput.safeParse(body);
      if (!success) {
        return c.json({
          success: false,
          message:"zod validation error"
         },402)
      }
      

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


const createBlog = async (c: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const user = await c.get('user'); // assuming user has { id, name, email, ... }
    const body = await c.req.json(); // ← correctly parse the request body

    const success = createBlogInput.safeParse(body);
    if (!success) {
      return c.json({
        success: false,
        message:"zod validation error"
      })
    }

    if (!body || !body.title || !body.content) {
      return c.json({
        success: false,
        message: "Title and content are required for the post",
      }, 400);
    }

    // create a new post
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id, // assuming user is { id, ... }
      }
    });

    return c.json({
      success: true,
      message: "Post created successfully",
      postId: post.id
    }, 200);

  } catch (err) {
    console.log("error :", err);
    return c.json({
      success: false,
      error: err,
      message: "Internal server Error",
    }, 500);
  }
};



const updateBlog = async (c: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const postId = c.req.param('id');
    const user = c.get('user');

    const success = blogUpdate.safeParse(body);
    if (!success) {
      return c.json({
        success: false,
        message: "zod validation error"
      })
    }


    if (!body || !postId) {
      return c.json({
        success: false,
        message: "either body is empty or id is not provided"
      }, 400);
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
        authorId: user.id
      },
      data: {
        title: body.title,
        content: body.content,
      }
    });

    return c.json({
      success: true,
      message: "post updated successfully",
      post: updatePost
    }, 200);

  } catch (err) {
    console.log("error: ", err);
    return c.json({
      success: false,
      message: "Internal server error",
      error: err
    }, 500);
  }
};


const getSingleBlog = async (c:any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const postid = c.req.param('id');
    const post = await prisma.post.findUnique({
      where: {
        id: postid
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
             name:true,
           }
        }
      }
    });

    if (!post) {
      return c.json({
        success: false,
        message:"blog doesn't exist for the particular id"
      },401)
    }

    return c.json({
      success: true,
      message: "blog fetched successfully",
      bolg:post,
    },200)
  }
  catch (err) {
    return c.json({
      success: false,
      message: "Internal server error"
    }, 500);
  }
}

const getAllBlog = async (c: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name:true
          }
        }
      }
    });
    return c.json({
      success: true,
      message: "all post fetched successfully",
      posts:posts,
    },200)
  }
  catch (err) {
    return c.json({
      success: true,
      message: "Internal server error",
      error: err
    }, 500);
  }
}

const deleteAll = async (c: any)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
     
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    return c.json({
      success: true,
      message: "data deleted successfully"
    }, 200);
  }
  catch (err:any) {
    return c.json({
      success: false,
      message: "error while deleting",
      error:err.message
   },500)
  }
}

export {
  signIn,
  signUp,
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteAll
}