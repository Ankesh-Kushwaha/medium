import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
import Publish from './pages/Publish'


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/writeblog' element={<CreateBlog />} />
          <Route path='/update/:id' element={<Publish/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App