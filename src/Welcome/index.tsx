import React from 'react'
import logo from './logo.svg'
import './Welcome.css'

export const Welcome: React.SFC = React.memo(() => (
  <div>
    <img src={logo} className="Welcome-logo" alt="logo" />
    <p>
      Introduction to the hooks of React 16.
    </p>
    <a
      className="Welcome-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn More about React.
    </a>
  </div>
))
