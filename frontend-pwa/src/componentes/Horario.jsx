import React, { useEffect, useState } from 'react'
import { CrearTablaHorario } from './CrearTablaHorario';
import axios from 'axios';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';
import swal from 'sweetalert';

export function Horario() {

    const { user, updatedates } = useAuth();
    const [franjas, setfranjas] = useState([])
    const [franja, setfranja] = useState([])
    const [idfranja, setidfranja] = useState(0);

    const limpiarDatos = () => {
        setfranja([])
        setidfranja(0);
    }


    useEffect(() => {
        let ignore = false
        const traerHorario = async () => {
            try {
                const respu = await axios.get(rutas.server + 'api/horario/activos/')
                if (!ignore) {
                    setfranjas(respu.data.filter(user => user.activo === true))
                    //setfranjas(respu.data)
                }
            } catch (e) {
                if (!ignore) {
                    //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
                }
            }
        }
        const RepedirTurno = async (id) => {
            if (user === null) { swal('Inicia sesión', 'Para agendar o gestionar horario debes iniciar sesión', 'info'); return }
            try {
                const respu = await axios.get(rutas.server + 'api/horario/' + id)
                if (!ignore) {
                    setfranja(respu.data.horario)
                    setidfranja(id)
                }
                document.getElementById('horario').style.display = 'block';
            }
            catch (e) {
                swal('Upss', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo', 'info')
            }
        }
        traerHorario();
        if (idfranja !== 0) { RepedirTurno(idfranja) }
        //document.getElementById('horario').style.display = 'none';
        return () => { ignore = true };
    }, [updatedates, idfranja, user])


    function MostrarHorarios() {
        if (franjas) {
            const horarios = franjas;
            const hors = horarios.map((url, index) =>
                <div key={horarios[index]._id} className='w3-panel w3-white w3-border w3-round-large'
                    onClick={e => { pedirTurno(horarios[index]._id) }} >
                    <div >
                        <CrearTablaHorario horario={url} />
                    </div>
                </div>
            );
            return (
                <div className='w3-responsive' style={{ height: '900px' }}>
                    {hors}
                </div>
            );
        }
        else { return null }
    }


    const pedirTurno = async (id) => {
        if (user === null) { swal('Inicia sesión', 'Para agendar o gestionar horario debes iniciar sesión', 'info'); return }
        try {
            const respu = await axios.get(rutas.server + 'api/horario/' + id)
            setfranja(respu.data.horario)
            setidfranja(id)
            document.getElementById('horario').style.display = 'block';
        }
        catch (e) {
            swal('Upss', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo', 'info')
        }
    }


    return (
        <>
            <div id="horario" className="w3-modal">
                <div style={{ width: '100%', margin: '-50px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                    <header className="w3-container w3-indigo w3-center">
                        <span style={{ textDecoration: 'underline' }} className="w3-button w3-display-topright"
                            onClick={e => { document.getElementById('horario').style.display = 'none'; limpiarDatos() }} >
                            cerrar
                        </span>
                        {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                        Clic en la franja que desees agendar.<br />
                        (si no aparece el horario por favor recargue la página)
                    </header>
                    <div style={{ backgroundColor: '#fdfeaa' }} className='w3-container'>
                        <CrearTablaHorario horario={franja} />
                    </div>
                    <div className='w3-center'>
                        <button style={{ marginRight: '25px', marginBottom: '20px', marginTop: '20px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={e => { document.getElementById('horario').style.display = 'none'; limpiarDatos() }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            {franjas.length > 0 ?
                <MostrarHorarios />
                : <div className='w3-container w3-padding w3-center w3-text-gray'>
                    <h1>Sin horario(s) definido(s) aún.</h1>
                </div>}
        </>
    )
}
