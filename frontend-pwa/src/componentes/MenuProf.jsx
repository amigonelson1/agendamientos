import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CerrarSesion } from './CerrarSesion';
import rutas from '../helpers/rutas';
import BarraBienvenida from './BarraBienvenida';

export function MenuProf() {

    return (
        <>
            <div className='w3-hide-small w3-top'>
                <div className="w3-container w3-black">
                    <div className="w3-col m6 w3-padding w3-left-align">
                        <Link to={rutas.profesorUser}>
                            <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">
                                Mi cuenta
                            </button>
                        </Link>
                    </div>
                    <div className="w3-col m6 w3-right-align w3-padding">
                        <CerrarSesion />
                    </div>
                </div>
                <BarraBienvenida />
            </div>
            <div className='w3-hide-medium w3-hide-large'>
                <div>
                    <div className="w3-container w3-black">
                        <div className="w3-col m6 w3-padding w3-left-align">
                            <Link to={rutas.profesorUser}>
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">
                                    Mi cuenta
                                </button>
                            </Link>
                        </div>
                        <div className="w3-col m6 w3-right-align w3-padding">
                            <CerrarSesion />
                        </div>
                    </div>
                </div>
                <BarraBienvenida />
            </div>
            <div className='w3-hide-small' style={{ marginTop: '90px' }}>
            </div>
            <Outlet />
        </>
    )
}