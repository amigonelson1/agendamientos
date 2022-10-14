import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CerrarSesion } from './CerrarSesion';
import rutas from '../helpers/rutas';
import BarraBienvenida from './BarraBienvenida';

export function MenuSocio() {

    return (
        <>
            <div className='w3-hide-small w3-top'>
                <div className="w3-container w3-black">
                    <div className="w3-col m2 w3-padding">
                        <Link to={rutas.socioUser}>
                            <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">
                                Mi cuenta
                            </button>
                        </Link>
                    </div>
                    <div className="w3-col m4 w3-left-align">
                        <button disabled className="w3-button">

                        </button>
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
                        <div className="w3-col m2 w3-padding">
                            <Link to={rutas.socioUser}>
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
            <div className='w3-hide-small' style={{ paddingTop: '90px' }} >
            </div>
            <Outlet />
        </>
    )
}
