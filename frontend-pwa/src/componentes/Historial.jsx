import React from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';

export default function Historial() {
    return (
        <>
            <div className='componentes w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                        <h2><b>Historial</b></h2>
                    </div>

                </div>

            </div>
        </>
    )
}
