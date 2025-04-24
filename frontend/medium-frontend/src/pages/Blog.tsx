import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom'
import FullBlog from '../components/FullBolg'
//@ts-expect-error
import FullBlogSkeleton from '../components/FullBlogSkeleton'

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || '' });
  //console.log(blog);
  
  if (loading) {
     return <div><FullBlogSkeleton/></div>
  }
 


  return (
    <div>
      <FullBlog title={blog ? blog.title :" No title"}
        content={blog ? blog.content :"No content"}
        author={blog && blog.author ? blog.author.name : "anonymous user"}
        id={id || "unknown-id"}
        postedOn={new Date(Date.now()).toLocaleString()}
      />

   
    </div>
  )
}

export default Blog