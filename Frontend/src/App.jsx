import React, { useEffect } from 'react'
import './index.css'
import AppRoutes from './AppRoutes'

function App() {
  useEffect(() => {
    // Simple connection test
    fetch('/api/health')
      .then(res => res.json())
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.error('Backend connection failed:', err));
  }, []);

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App