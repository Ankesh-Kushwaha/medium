import z from 'zod';

export const signupInput = z.object({
  email: z.string().email(),
  name: z.string().min(3).optional(),
  password: z.string().min(6),
})

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})



export const createBlogInput = z.object({
  title: z.string(),
  content:z.string()
})




export const blogUpdate = z.object({
  id: z.string(),
  title: z.string(),
  content:z.string()
})


//zod inference  in zod 
export type signupInput = z.infer<typeof signupInput>;
export type signinInput = z.infer<typeof signinInput>;
export type createBlogInput = z.infer<typeof createBlogInput>;
export type blogUpdate=z.infer<typeof blogUpdate>