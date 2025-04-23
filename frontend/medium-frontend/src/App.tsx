import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './pages/SignUp'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import Blogs from './pages/Blogs'


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
          <Route path='/blogs'  element={<Blogs />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App