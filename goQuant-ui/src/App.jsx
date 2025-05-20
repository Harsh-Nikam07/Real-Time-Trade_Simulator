import React from 'react'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      background: '#f5f6fa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Dashboard />
    </div>
  )
}

export default App
