import ReactDOM from 'react-dom/client'
import { initAxiosInterceptors } from 'configs/axios'
import App from 'App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

initAxiosInterceptors()

root.render(<App />)
