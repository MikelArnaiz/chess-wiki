import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/Home'
import { UserPage } from './pages/UserPage/UserPage'
import { Navbar } from './components/Navbar/Navbar'
import { UsersContextProvider } from './components/UsersContextProvider/UsersContextProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <UsersContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </UsersContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
