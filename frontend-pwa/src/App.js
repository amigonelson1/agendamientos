import React from 'react'
import { Rutas } from './rutas/Rutas'
import AuthProvider from './auth/AuthProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { PiePagina } from './componentes/PiePagina';


export default function App() {
    return (
        <div className='w3-animate-left'>
            <Router>
                <AuthProvider>
                    <Rutas />
                    <PiePagina />
                </AuthProvider>
            </Router>
        </div>
    )
}
