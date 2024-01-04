import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import AuthProvider from './providers/AuthProvider';
import QueryProvider from './providers/QueryProvider';
import ReduxProvider from './providers/ReduxProvider';

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
