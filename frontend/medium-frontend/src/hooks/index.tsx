import { useEffect, useState} from "react"
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



export const useBlog = ({ id }: { id: string }) => {
//  console.log(id);
  const [loading, setloading] = useState(true);
  const [blog, setBlog] = useState<Blogs |null>(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(` https://backend.ankeshkush9651.workers.dev/api/v1/get/${id}`, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      setBlog(res.data.bolg);
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




