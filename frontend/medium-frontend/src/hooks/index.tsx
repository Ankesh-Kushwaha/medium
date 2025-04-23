import { useEffect, useState ,useCallback} from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

interface Blogs{
  "content": string,
  "title": string,
  "id": string,
  "author": {
     "name":string
  }
}

export const useBlogs = () => {
  const [loading, setloading] = useState(true);
  const [blogs, setBlog] = useState<Blogs[]>([]);

  const fetchData = async () => {
          try {
            const res = await axios.get(`https://backend.ankeshkush9651.workers.dev/api/v1/bulk`,
              {
                headers: {
                  "Authorization": localStorage.getItem('token')
             }
           }
            );
            setBlog(res.data.posts);
            setloading(false);
            toast.success(res.data.message);
    }
          catch (err) {
            toast.error('ankesjmckmdkmck')
        toast.error(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }
   
  useEffect(() => {
    fetchData();
  },[])

  return {
    loading,
    blogs
  }
}



export const useBlog = ({id}:{id:string}) => {
  const [loading, setloading] = useState(true);
  const [blog, setBlog] = useState<Blogs | null>(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://backend.ankeshkush9651.workers.dev/api/v1/blog/${id}`, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      console.log(res.data.blog);
      setBlog(res.data.blog);
      setloading(false);
      toast.success(res.data.message);
    } catch (err) {
      toast.error('Failed to fetch the blog');
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    loading,
    blog
  };
}




