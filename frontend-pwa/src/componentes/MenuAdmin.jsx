import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import rutas from '../helpers/rutas';
import BarraBienvenida from './BarraBienvenida';
import { CerrarSesion } from './CerrarSesion';


export function MenuAdmin() {

    const [menu, setmenu] = useState(false)

    const BarraMenu = () => {
        window.scroll(0, 0)
        setmenu(!menu)
        window.scroll(0, 0)
    }

    return (
        <>
            {/*Menu para pantallas medianas y grandes*/}
            <div className='w3-top w3-hide-small'>
                <div className="w3-container w3-black">
                    <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                        <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                            Página
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" >
                            <Link to={rutas.adminPagina}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Personalizar
                                </div>
                            </Link>
                            <Link to={rutas.adminImagenes}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Imágenes
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                        <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                            Horario
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                            <Link to={rutas.adminHorario}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Configurar
                                </div>
                            </Link>
                            <Link to={rutas.adminTodoHorarios}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Ver horarios
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                        <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                            Anuario
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                            <Link to={rutas.adminAnuario}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Configurar
                                </div>
                            </Link>
                            <Link to={rutas.adminHistorial}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Historial
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                        <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                            Usuarios
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                            <Link to={rutas.adminRegistro}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Registrar
                                </div>
                            </Link>
                            <Link to={rutas.adminUsers}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Administrar
                                </div>
                            </Link>
                            <Link to={rutas.adminMeUser}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Mi cuenta
                                </div>
                            </Link>
                            <Link to={rutas.adminPermisos}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Formularios
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                        <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                            Guia
                        </button>
                        <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                            <Link to={rutas.adminAyuda}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Ayuda
                                </div>
                            </Link>
                            <Link to={rutas.adminAcerca}>
                                <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                    Acerca de
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w3-col m2 w3-right-align w3-padding">
                        <CerrarSesion />
                    </div>
                </div>
                <BarraBienvenida />
            </div>
            {/*Menu para pantallas pequeñas*/}
            <div className='w3-hide-medium w3-hide-large'>
                <div className='w3-top w3-container w3-black w3-col'>
                    <div style={{ display: 'inline' }}>
                        <i className="pi pi-bars" style={{ 'fontSize': '2em', marginTop: '15px', marginBottom: '10px' }} onClick={BarraMenu} />
                    </div>
                    <div className='w3-right-align' style={{ marginTop: '-45px', marginBottom: '10px' }}>
                        <CerrarSesion />
                    </div>
                </div>
                {menu ?
                    <div>
                        <div className="w3-container w3-black" style={{ marginTop: '45px' }}>
                            <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                                    Página
                                </button>
                                <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" style={{ position: 'relative', marginLeft: '20px' }}>
                                    <Link to={rutas.adminPagina}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Personalizar
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminImagenes}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Imágenes
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                                    Horario
                                </button>
                                <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" style={{ position: 'relative', marginLeft: '20px' }}>
                                    <Link to={rutas.adminHorario}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Configurar
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminTodoHorarios}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Ver horarios
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                                    Anuario
                                </button>
                                <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" style={{ position: 'relative', marginLeft: '20px' }}>
                                    <Link to={rutas.adminAnuario}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Configurar
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminHistorial}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Historial
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                                    Usuarios
                                </button>
                                <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" style={{ position: 'relative', marginLeft: '20px' }}>
                                    <Link to={rutas.adminRegistro}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Registrar
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminUsers}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Administrar
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminMeUser}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Mi cuenta
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminPermisos}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Formularios
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                                <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                                    Guia
                                </button>
                                <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" style={{ position: 'relative', marginLeft: '20px' }}>
                                    <Link to={rutas.adminAyuda}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Ayuda
                                        </div>
                                    </Link>
                                    <Link to={rutas.adminAcerca}>
                                        <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                            Acerca de
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <BarraBienvenida />
                    </div> :
                    <div style={{ marginTop: '54px' }}>
                        <BarraBienvenida />
                    </div>}
            </div>
            <div className='w3-hide-small' style={{marginTop:'95px'}}>
            </div>
            <Outlet />
        </>
    )
}
