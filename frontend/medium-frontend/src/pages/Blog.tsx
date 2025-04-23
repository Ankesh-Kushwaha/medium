import React from 'react'
import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom'
import FullBlog from '../components/FullBolg'

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = id ? useBlog({ id }) : { loading: false, blog: null };
  //console.log(blog);
  
  if (loading) {
     return <div>Loading....</div>
  }
 


  return (
    <div>
      <FullBlog title={blog ? blog.title :" No title"}
        content={blog ? blog.content :"No content"}
        author={blog ? blog.author.name :"anonyms user"}
        postedOn={new Date(Date.now()).toLocaleString()}
      />

   
    </div>
  )
}

export default Blog