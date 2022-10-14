import React from 'react'
import useAuth from '../auth/useAuth'

export function CerrarSesion() {

    const { logout } = useAuth();

    return (
        <div>
            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small"
                onClick={logout}>
                <b>CERRAR SESION</b>
            </button>
        </div>
    )
}
