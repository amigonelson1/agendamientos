import React from 'react'
import useAuth from '../auth/useAuth'
import 'primeicons/primeicons.css';

export function PiePagina() {

    const { datosempresa } = useAuth();

    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col w3-center">
                    {datosempresa.logo ?
                        <a href={datosempresa.logo} target="_blank" rel="noopener noreferrer"> {/* El "rel="noopener noreferrer"" evita redireccionamiento malicioso*/}
                            <h3>
                                <b>
                                    {datosempresa.title}
                                </b><br></br>
                            </h3>
                        </a>
                        :
                        <h3>
                            <b>{datosempresa.title}</b><br></br>
                        </h3>
                    }
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Dirección:</b><br></br>
                    <b>{datosempresa.direccion}</b>
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Teléfono(s):</b><br></br>
                    <b>{datosempresa.telefono1} - </b>
                    <b>{datosempresa.telefono2}</b><br></br>
                    <b>{datosempresa.telefono3}</b><br></br>
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Contacto:</b><br></br>
                    <b>{datosempresa.administrador}</b><br></br>
                    <a href={"mailto:" + datosempresa.email} target="_blank" rel="noopener noreferrer">
                        <b>
                            {datosempresa.email}
                        </b>
                    </a>

                </div>
                <div className="w3-col w3-panel w3-center">
                    {datosempresa.facebook ?
                        <a href={datosempresa.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-facebook" style={{ fontSize: '2em', marginRight: '8px' }}></i>
                        </a> : null}
                    {datosempresa.instagram ?
                        <a href={datosempresa.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-instagram" style={{ fontSize: '2em', marginRight: '8px' }}></i>
                        </a> : null}
                    {datosempresa.whatsapp ?
                        <a href={"https://api.whatsapp.com/send?phone=+57" + datosempresa.whatsapp + "&text=Bienvenido,%20pronto%20serás%20atendido.%20Clic%20en:%20CONTINUAR%20AL%20CHAT"} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-whatsapp" style={{ fontSize: '2em', marginRight: '8px' }}></i>
                        </a> : null}
                    {datosempresa.twitter ?
                        <a href={datosempresa.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-twitter" style={{ fontSize: '2em', marginRight: '8px' }}></i>
                        </a> : null}
                    {datosempresa.linkedin ?
                        <a href={datosempresa.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-linkedin" style={{ fontSize: '2em', marginRight: '8px' }}></i>
                        </a> : null}
                    {datosempresa.youtube ?
                        <a href={datosempresa.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="pi pi-youtube" style={{ fontSize: '2em' }}></i>
                        </a> : null}
                </div>
            </div>
        </>
    )
}
