import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './layout/Layout.jsx'
import ProtectedRoute from './secure/ProtectedRoute.jsx'
import Theme from './pages/Theme.jsx'
import Onboarding from './pages/Onboarding.jsx'
import PublicBioLink from './pages/PublicBioLink.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import EmailSuccess from './pages/EmailSuccess.jsx'



const route = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path='/user/register' element={<Register />} />
    <Route path='/user/email-sent' element={<EmailVerify />} />
    <Route path='/user/verify-email' element={<EmailSuccess />} />
    <Route path='/user/login' element={<Login />} />
    <Route path='/:username' element={<PublicBioLink/>}/>
    <Route  element={<ProtectedRoute />}>
      <Route path='/user/onboard' element={<Onboarding />} />
      <Route path='/user/dashboard' element={<Dashboard />} />
      <Route path='/user/appearance' element={<Theme />} />
    </Route>
  </Route>
))

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={route} />
    </StrictMode>

  </Provider>,
)
