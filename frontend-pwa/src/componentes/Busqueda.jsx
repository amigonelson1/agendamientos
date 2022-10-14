import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EditarUser } from './EditarUser';
import useAuth from '../auth/useAuth'
import roles from "../helpers/roles";
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas';
import perfil from '../imagenes/perfil.png';

const Tamano = {
    //width:'200px',
    height: '486px',
    overFlow: 'auto'
}
var res = [];

export function Busqueda() {
    window.scroll(0, 0)

    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [mostrarUsers, setMU] = useState(false);
    const [roll, setRoll] = useState('0');
    const [activo, setActivo] = useState('0');
    const [documento, setdocumento] = useState('');
    const [envio, setenvio] = useState(false);
    const [contador, setcontador] = useState(0);


    const traerDatos = async () => {
        setenvio(true);
        try {
            res = await axios.get(rutas.server + 'api/users', {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            if (roll === '0') {
                setUsers(res.data)
                if (activo === '1') { setUsers(res.data.filter(user => user.activo === true)) }
                if (activo === '2') { setUsers(res.data.filter(user => user.activo === false)) }
            }
            if (roll === '1') {
                setUsers(res.data.filter(user => user.rol[0].name === roles.admin));
                if (activo === '1') { setUsers(res.data.filter(user => user.rol[0].name === roles.admin && user.activo === true)) }
                if (activo === '2') { setUsers(res.data.filter(user => user.rol[0].name === roles.admin && user.activo === false)) }
            }
            if (roll === '2') {
                setUsers(res.data.filter(user => user.rol[0].name === roles.profesor));
                if (activo === '1') { setUsers(res.data.filter(user => user.rol[0].name === roles.profesor && user.activo === true)) }
                if (activo === '2') { setUsers(res.data.filter(user => user.rol[0].name === roles.profesor && user.activo === false)) }
            }
            if (roll === '3') {
                setUsers(res.data.filter(user => user.rol[0].name === roles.canchero));
                if (activo === '1') { setUsers(res.data.filter(user => user.rol[0].name === roles.canchero && user.activo === true)) }
                if (activo === '2') { setUsers(res.data.filter(user => user.rol[0].name === roles.canchero && user.activo === false)) }
            }
            if (roll === '4') {
                setUsers(res.data.filter(user => user.rol[0].name === roles.socio));
                if (activo === '1') { setUsers(res.data.filter(user => user.rol[0].name === roles.socio && user.activo === true)) }
                if (activo === '2') { setUsers(res.data.filter(user => user.rol[0].name === roles.socio && user.activo === false)) }
            }
            setMU(true);
            setenvio(false);
        } catch {
            setenvio(false);
            swal('Upsss', 'Lo sentimos, no pudimos procesar tú solicitud, vuelve a intentarlo', 'info')
        }
    }

    const limpiarBusqueda = () => {
        setUsers([]);
        setMU(false)
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    //funcion para volver a cargar documento cuando se solicita el mismo documento en la busqueda
    useEffect(() => {
        setcontador(0);
    }, [documento])

    const envioDocumento = (value) => {
        setdocumento(value);
        setcontador(contador + 1);
        limpiarBusqueda();
    }


    return (
        <>
            <div id="id02" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <h3>Por favor espera un momento</h3>
                        Estamos trabajando en tu solicitud.
                    </header>
                    <div className="w3-container w3-panel w3-center">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="4s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="1.8s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" /><br></br>
                        <ProgressBar mode="indeterminate" style={{ height: '8px' }} />
                    </div>
                </div>
            </div>
            <div className='componentes  w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-center">
                        <h3 className="w3-text-indigo">
                            <b>Mostrar todos los usuarios</b>
                        </h3>
                    </div>
                    <div className="w3-panel w3-padding w3-col m6">
                        <label className="w3-text-indigo"><b>Roll.</b></label>
                        <select className="w3-select w3-hover-light-gray" name="option"
                            onChange={e => setRoll(e.target.value)}>
                            <option value={'0'}>Todos</option>
                            <option value={'1'}>Administrador</option>
                            <option value={'2'}>Profesor</option>
                            <option value={'3'}>Canchero</option>
                            <option value={'4'}>Socio</option>
                        </select>
                    </div>
                    <div className="w3-panel w3-padding w3-col m6">
                        <label className="w3-text-indigo"><b>Activo o inactivo.</b></label>
                        <select className="w3-select w3-hover-light-gray" name="option"
                            onChange={e => setActivo(e.target.value)}>
                            <option value={'0'}>Todo</option>
                            <option value={'1'}>Activo</option>
                            <option value={'2'}>Inactivo</option>
                        </select>
                    </div>
                    <div id="output" className="w3-panel w3-center">
                        <button type='submit' className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={traerDatos} title="Clic para traer y mostrar resultados">
                            Mostrar
                        </button>
                    </div>
                    {mostrarUsers ?
                        <div>
                            <div className="w3-panel w3-right-align">
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarBusqueda}>
                                    Cerrar
                                </button>
                                <div className="w3-left-align">
                                    <label className="w3-text-indigo">
                                        Se encontraron en total <b>{users.length}</b> usuarios según su criterio de búsqueda.
                                    </label>
                                </div>
                            </div>
                            <div className="w3-panel w3-responsive" style={Tamano}>
                                <table className="w3-table w3-hoverable">
                                    <thead>
                                        <tr className="w3-indigo">
                                            <th></th>
                                            <th>Documento</th>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Roll</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="w3-text-indigo">
                                        {
                                            users.map(user => (
                                                <tr key={user.documento} title="Da Clic para copiar documento en: Buscar usuario"
                                                    onClick={() => envioDocumento(user.documento)}>
                                                    <td className='w3-center'>
                                                        {user.imagen ? user.imagen === 'null' ?
                                                            <img src={perfil} alt="Sin imagen" className="w3-circle" style={{ height: "100%", minHeight: '80px', maxHeight: "80px" }} />
                                                            : <img src={user.imagen} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '80px', maxHeight: "80px" }} />
                                                            : <img src={perfil} alt="Sin imagen" className="w3-circle" style={{ height: "100%", minHeight: '80px', maxHeight: "80px" }} />}
                                                    </td>
                                                    <td>{user.documento}</td>
                                                    <td>{user.codigo}</td>
                                                    <td>{user.nombre}</td>
                                                    <td>{user.rol[0].name}</td>
                                                    <td>{user.activo ? 'Activo' : 'Inactivo'}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null}
                </div>
                <EditarUser docum={documento} cambio={contador} />
            </div>
        </>
    )
}
