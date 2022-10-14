import React from 'react'
import rutas from '../helpers/rutas'
import { Link } from 'react-router-dom'
import notFound from '../imagenes/notFound.png'

export function NotFoundPage() {
    return (
        <div className='w3-animate-zoom w3-center'>
            <div className='w3-margin-top w3-margin-right w3-right-align'>
                <Link to={rutas.admin}>
                    <b style={{ fontSize: '20px' }} >volver</b>
                </Link>
            </div>
            <h1>Error</h1>
            <div className='contenedor'>
                <img src={notFound} className='cortar' alt='imagen tomada de: https://pixabay.com/es/vectors/error-mano-arte-error-404-6482984/' />
            </div>
            <h1>Not found requested url</h1>
            <div className='w3-margin-top w3-margin-bottom'>
                <Link to={rutas.admin}>
                    <b style={{ fontSize: '20px' }}>volver</b>
                </Link>
            </div>
        </div>
    )
}
