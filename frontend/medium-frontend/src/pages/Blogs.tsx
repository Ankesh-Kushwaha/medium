import BlogCard from '../components/BlogCard';
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks/index';
import BlogCardSkeleton from '../components/BlogCardSkeleton';
 
const Blogs = () => {
  const { loading, blogs } = useBlogs();
  
  if (loading) {
    return <div>
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton/>
      </div>
  }

  return (
    <div>
      <AppBar />
          <div className='flex justify-center p-4'>
        <div className=' max-w-xl'>
         {blogs.map(blog=>   <BlogCard
        authorName={blog.author.name}
           title={blog.title}
           key={blog.id}
           id={blog.id}
        content={blog.content}
        publishedDate={ new Date(Date.now()).toLocaleDateString()}
        />)}
    </div>
    </div>
    </div>
  )
}

export default Blogs;