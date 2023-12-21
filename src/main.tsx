import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import AuthProvider from './Providers/AuthProvider';
import QueryProvider from './Providers/QueryProvider';
import ReduxProvider from './Providers/ReduxProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
)
