import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Utils/RouteController.jsx'
import InfoComponent from './Contexts/InfoComponent.jsx'
import AuthContext from './Contexts/AuthContext.jsx'
import InfoCard from './Utils/InfoCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InfoComponent>
      <AuthContext>
    <RouterProvider router={router} />
    <InfoCard/>
      </AuthContext>
    </InfoComponent>
  </StrictMode>,
)
