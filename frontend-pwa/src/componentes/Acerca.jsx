import React from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'
import logoUIS from '../imagenes/logoUIS.png';
import logoEISI from '../imagenes/logoEISI.png';


export function Acerca() {

    window.scroll(0, 0)

    return (
        <>
            <div className='w3-container w3-white w3-animate-top'>
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >cerrar</b>
                    </Link>
                </div>
                <div style={{ maxWidth: '1000px', margin: 'auto' }}>
                    <div className='w3-container w3-white w3-col'>
                        <div className='w3-col m2 w3-center w3-padding'>
                            <a href="http://cormoran.uis.edu.co/eisi/index.jsp" target="_blank" rel="noopener noreferrer">
                                <img src={logoEISI} alt="Logo Escuela Ingeniería de Sistemas e Informática" height={'80px'} />
                            </a>
                        </div>
                        {/*Para pantallas grandes y medianas*/}
                        <div className='w3-col m8 w3-text-gray w3-padding w3-hide-small' style={{ fontSize: '18px' }}>
                            Escuela de<br />
                            <span style={{ fontSize: '28px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                Ingeniería de Sistemas e Informática
                            </span>
                        </div>
                        {/*Para pantallas pequeñas*/}
                        <div className='w3-col m8 w3-text-gray w3-padding w3-center w3-hide-medium w3-hide-large' style={{ fontSize: '18px' }}>
                            Escuela de<br />
                            <span style={{ fontSize: '28px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                Ingeniería de Sistemas e Informática
                            </span>
                        </div>
                        <div className='w3-col m2 w3-center w3-padding w3-hide-small w3-hide-medium'>
                            <a href="https://uis.edu.co/inicio/" target="_blank" rel="noopener noreferrer">
                                <img src={logoUIS} alt="Logo Universidad Industrial de Santander" height={'60px'} /><br />
                                <span style={{ fontSize: '8px' }}>VIGILADA MINEDUCACIÓN</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='acerca w3-animate-bottom'>
                <div className='componentes'>
                    <div className="w3-container">
                        <div className="w3-padding">
                            <h2 className='w3-center'><b>
                                Aplicativo web para gestión de citas o turnos citEven_v01
                            </b></h2>
                            <div>
                                <ul><b>Desarrollado por:</b>
                                    <li>Javier David Landazábal</li>
                                    <li>José Nelson Amaris</li>
                                </ul>
                            </div>
                            <div>
                                <b>Director de proyecto:</b><br />
                                Manuel Guillermo Flórez Becerra<br />
                                MSc, Escuela de Ingeniería de Sistemas e Informática.
                            </div><br />
                            <div>
                                Aplicativo web para el agendamiento de citas o turnos para diferentes escenarios en su primera versión(2022)
                                desarrollado por estudiantes de último nivel de ingenierías de sistemas de la Universidad Industrial de Santander
                                como proyecto de grado y prototipo de ejemplo para la asignatura de programación en la web, usando tecnologías de desarrollo
                                MERN(Mongo, Express, React.js y Node.js) stack.
                            </div><br />
                            <div className='w3-right-align' style={{ fontSize: '12px' }}>
                                Imagenes e iconos tomados de:<br />
                                <a href="https://www.flaticon.es/iconos-gratis/calendario" title="calendario iconos" target="_blank" rel="noopener noreferrer">Calendario iconos creados por Freepik - Flaticon</a><br />
                                <a href="https://pixabay.com/es/photos/raqueta-padel-pelota-tenis-de-p%c3%a1del-6308994/" title="Imagenes gratis de pixabay.com" target="_blank" rel="noopener noreferrer">Imagenes gratis de pixabay.com</a><br />
                                <a href="https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F" title="Gifs tomado de giphy.com" target="_blank" rel="noopener noreferrer">giphy.com/</a><br />
                            </div><br />
                            <div className='w3-center'>
                                Escuela de Ingeniería de Sistemas e Informática<br />
                                Facultad de Ingenierías Fisicomecánicas<br />
                                Universidad Industrial de Santander<br />
                                Bucaramanga<br />
                                2022<br />

                            </div>
                        </div>
                        <div className="w3-container w3-center">
                            <Link to="/users/admin/">
                                <h3>
                                    <b>Cerrar</b>
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
