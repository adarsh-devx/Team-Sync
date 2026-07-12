import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/Store.jsx'
import AppRoutes from './app/routes/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>
  
)
