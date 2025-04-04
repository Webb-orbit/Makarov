import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/configstore.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blogslist from './compos/common/Blogslist.jsx'
import Makarov from './pages/Makarov.jsx'
import Dashadmin from './pages/Dashadmin.jsx'
import Dashoverview from './compos/dashbord/Dashoverview.jsx'
import About from './compos/common/About.jsx'
import Addblog from './compos/dashbord/Addblog.jsx'
import Setting from './compos/dashbord/Setting.jsx'
import Editblog from './compos/dashbord/Editblog.jsx'

import Blogpage from './pages/Blogpage.jsx'
import Login from './compos/auth/Login.jsx'



import { Analytics } from "@vercel/analytics/react"
import Test from './pages/test.jsx'
import Adminview from './compos/dashbord/Adminview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<App />}>
          <Route path='/hellolog' element={<Login />} />
          <Route path='/test' element={<Test />} />

            <Route path='/' index element={<Home />} />

            <Route path='/mkr' element={<Makarov />} >
              <Route path='/mkr/blogs' element={<Blogslist />} />
              <Route path='/mkr/blog/:blogid' element={<Blogpage />} />
              <Route path='/mkr/about' element={<About />} />
            </Route>

            <Route path='/dashboard' element={<Dashadmin />}>
              <Route path='/dashboard/overview' element={<Dashoverview />} />
              <Route path='/dashboard/settings' element={<Setting />} />
              <Route path='/dashboard/create' element={<Addblog />} />
              <Route path='/dashboard/blog/:blogid' element={<Adminview />} />
              <Route path='/dashboard/edit/:blogid' element={<Editblog />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <Analytics />
    </Provider>
  </StrictMode>,
)
