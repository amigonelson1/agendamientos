import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import swal from 'sweetalert';
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';


export default function Permisos() {

    const { user, datosempresa, upDateDates, updatedates } = useAuth();
    const [envio, setenvio] = useState(false);
    const [solnombre, setsolnombre] = useState(datosempresa.solNombre);
    const [soldocumento, setsoldocumento] = useState(true);
    const [solcodigo, setsolcodigo] = useState(true);
    const [soldireccion, setsoldireccion] = useState(datosempresa.solDireccion);
    const [soltelefono, setsoltelefono] = useState(datosempresa.solTelefono);
    const [soltelefono2, setsoltelefono2] = useState(datosempresa.solTelefono2);
    const [solemail, setsolemail] = useState(true);
    const [solidfamiliar, setsolidfamiliar] = useState(datosempresa.solIdFamiliar);
    const [solimagen, setsolimagen] = useState(datosempresa.solImagen);
    const [solfechaNacimiento, setsolfechanacimiento] = useState(datosempresa.solFechaNacimiento);
    const [solestatura, setsolestatura] = useState(datosempresa.solEstatura);
    const [solpeso, setsolpeso] = useState(datosempresa.solPeso);
    const [solgenero, setsolgenero] = useState(datosempresa.solGenero);
    const [solbarrio, setsolbarrio] = useState(datosempresa.solBarrio);
    const [solcategoria, setsolcategoria] = useState(datosempresa.solCategoria);
    const [soltorneos, setsoltorneos] = useState(datosempresa.solTorneos);
    const [solbrazoDominante, setsolbrazo] = useState(datosempresa.solBrazoDominante);
    const [soltodo, setsoltodo] = useState(false);
    const [editnombre, setnombre] = useState(datosempresa.editNombre);
    const [editdocumento, setdocumento] = useState(datosempresa.editDocumento);
    const [editcodigo, setcodigo] = useState(datosempresa.editCodigo);
    const [editdireccion, setdireccion] = useState(datosempresa.editDireccion);
    const [edittelefono, settelefono] = useState(datosempresa.editTelefono);
    const [edittelefono2, settelefono2] = useState(datosempresa.editTelefono2);
    const [editemail, setemail] = useState(datosempresa.editEmail);
    const [editidfamiliar, setidfamiliar] = useState(datosempresa.editIdFamiliar);
    const [editimagen, setimagen] = useState(datosempresa.editImagen);
    const [editfechaNacimiento, setfechanacimiento] = useState(datosempresa.editFechaNacimiento);
    const [editestatura, setestatura] = useState(datosempresa.editEstatura);
    const [editpeso, setpeso] = useState(datosempresa.editPeso);
    const [editgenero, setgenero] = useState(datosempresa.editGenero);
    const [editbarrio, setbarrio] = useState(datosempresa.editBarrio);
    const [editcategoria, setcategoria] = useState(datosempresa.editCategoria);
    const [edittorneos, settorneos] = useState(datosempresa.editTorneos);
    const [editbrazoDominante, setbrazo] = useState(datosempresa.editBrazoDominante);
    const [edittodo, settodo] = useState(false);
    const [mostrar, setmostrar] = useState(true);
    const [mostraredit, setmostraredit] = useState(false);

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    useEffect(() => {
        setsolnombre(datosempresa.solNombre);
        setsoldocumento(true);
        setsolcodigo(true);
        setsoldireccion(datosempresa.solDireccion);
        setsoltelefono(datosempresa.solTelefono);
        setsoltelefono2(datosempresa.solTelefono2);
        setsolemail(true);
        setsolidfamiliar(datosempresa.solIdFamiliar);
        setsolimagen(datosempresa.solImagen);
        setsolfechanacimiento(datosempresa.solFechaNacimiento);
        setsolestatura(datosempresa.solEstatura);
        setsolpeso(datosempresa.solPeso);
        setsolgenero(datosempresa.solGenero);
        setsolbarrio(datosempresa.solBarrio);
        setsolcategoria(datosempresa.solCategoria);
        setsoltorneos(datosempresa.solTorneos);
        setsolbrazo(datosempresa.solBrazoDominante);
        setnombre(datosempresa.editNombre);
        setdocumento(datosempresa.editDocumento);
        setcodigo(datosempresa.editCodigo);
        setdireccion(datosempresa.editDireccion);
        settelefono(datosempresa.editTelefono);
        settelefono2(datosempresa.editTelefono2);
        setemail(datosempresa.editEmail);
        setidfamiliar(datosempresa.editIdFamiliar);
        setimagen(datosempresa.editImagen);
        setfechanacimiento(datosempresa.editFechaNacimiento);
        setestatura(datosempresa.editEstatura);
        setpeso(datosempresa.editPeso);
        setgenero(datosempresa.editGenero);
        setbarrio(datosempresa.editBarrio);
        setcategoria(datosempresa.editCategoria);
        settorneos(datosempresa.editTorneos);
        setbrazo(datosempresa.editBrazoDominante);
    }, [mostrar,
        datosempresa.solNombre,
        datosempresa.solDocumento,
        datosempresa.solCodigo,
        datosempresa.solDireccion,
        datosempresa.solTelefono,
        datosempresa.solTelefono2,
        datosempresa.solEmail,
        datosempresa.solIdFamiliar,
        datosempresa.solImagen,
        datosempresa.solFechaNacimiento,
        datosempresa.solEstatura,
        datosempresa.solPeso,
        datosempresa.solGenero,
        datosempresa.solBarrio,
        datosempresa.solCategoria,
        datosempresa.solTorneos,
        datosempresa.solBrazoDominante,
        datosempresa.editNombre,
        datosempresa.editDocumento,
        datosempresa.editCodigo,
        datosempresa.editDireccion,
        datosempresa.editTelefono,
        datosempresa.editTelefono2,
        datosempresa.editEmail,
        datosempresa.editIdFamiliar,
        datosempresa.editImagen,
        datosempresa.editFechaNacimiento,
        datosempresa.editEstatura,
        datosempresa.editPeso,
        datosempresa.editGenero,
        datosempresa.editBarrio,
        datosempresa.editCategoria,
        datosempresa.editTorneos,
        datosempresa.editBrazoDominante
    ])

    useEffect(() => {
        setmostraredit(false);
        setmostrar(true);
    }, [updatedates])


    useEffect(() => {
        if (soltodo) {
            setsolnombre(true)
            setsoldocumento(true)
            setsolcodigo(true)
            setsoltelefono(true)
            setsoltelefono2(true)
            setsoldireccion(true)
            setsolemail(true)
            setsolidfamiliar(true)
            setsolimagen(true)
            setsolfechanacimiento(true);
            setsolestatura(true);
            setsolpeso(true);
            setsolgenero(true);
            setsolbarrio(true);
            setsolcategoria(true);
            setsoltorneos(true);
            setsolbrazo(true);
        }
    }, [soltodo])


    useEffect(() => {
        if (!solnombre || !soldocumento || !soltelefono || !soltelefono2 || !soldireccion || !solcodigo || !solemail || !solidfamiliar || !solimagen || !solfechaNacimiento || !solestatura || !solpeso || !solgenero || !solbarrio || !solcategoria || !soltorneos || !solbrazoDominante) {
            setsoltodo(false)
        }
        if (solnombre && soldocumento && soltelefono && soltelefono2 && soldireccion && solcodigo && solemail && solidfamiliar && solimagen && solfechaNacimiento && solestatura && solpeso & solgenero && solbarrio && solcategoria && soltorneos && solbrazoDominante) {
            setsoltodo(true)
        }
    }, [solnombre,
        soldocumento,
        soltelefono,
        soltelefono2,
        soldireccion,
        solcodigo,
        solemail,
        solidfamiliar,
        solimagen,
        solfechaNacimiento,
        solestatura,
        solpeso,
        solgenero,
        solbarrio,
        solcategoria,
        soltorneos,
        solbrazoDominante])


    useEffect(() => {
        if (edittodo) {
            setnombre(true)
            setdocumento(true)
            setcodigo(true)
            settelefono(true)
            settelefono2(true)
            setdireccion(true)
            setemail(true)
            setidfamiliar(true)
            setimagen(true)
            setfechanacimiento(true);
            setestatura(true);
            setpeso(true);
            setgenero(true);
            setbarrio(true);
            setcategoria(true);
            settorneos(true);
            setbrazo(true);
        }
    }, [edittodo])

    useEffect(() => {
        if (!editnombre || !editdocumento || !edittelefono || !edittelefono2 || !editdireccion || !editcodigo || !editemail || !editidfamiliar || !editimagen || editfechaNacimiento || !editestatura || !editpeso || !editgenero || !editbarrio || !editcategoria || !edittorneos || !editbrazoDominante) {
            settodo(false)
        }
        if (editnombre && editdocumento && edittelefono && edittelefono2 && editdireccion && editcodigo && editemail && editidfamiliar && editimagen && editfechaNacimiento && editestatura && editpeso && editgenero && editbarrio && editcategoria && edittorneos && editbrazoDominante) {
            settodo(true)
        }
    }, [editnombre,
        editdocumento,
        edittelefono,
        edittelefono2,
        editdireccion,
        editcodigo,
        editemail,
        editidfamiliar,
        editimagen,
        editfechaNacimiento,
        editestatura,
        editpeso,
        editgenero,
        editbarrio,
        editcategoria,
        edittorneos,
        editbrazoDominante,
    ])


    const desSolTodo = () => {
        setsolnombre(false)
        //setsoldocumento(false)
        //setsolcodigo(false)
        setsoltelefono(false)
        setsoltelefono2(false)
        setsoldireccion(false)
        //setsolemail(false)
        setsolidfamiliar(false)
        setsolimagen(false)
        setsolfechanacimiento(false);
        setsolestatura(false);
        setsolpeso(false);
        setsolgenero(false);
        setsolbarrio(false);
        setsolcategoria(false);
        setsoltorneos(false);
        setsolbrazo(false);
    }

    const desEditTodo = () => {
        setnombre(false)
        setdocumento(false)
        setcodigo(false)
        settelefono(false)
        settelefono2(false)
        setdireccion(false)
        setemail(false)
        setidfamiliar(false)
        setimagen(false)
        setfechanacimiento(false);
        setestatura(false);
        setpeso(false);
        setgenero(false);
        setbarrio(false);
        setcategoria(false);
        settorneos(false);
        setbrazo(false);
    }

    const enviarDatos = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/formulario/' + datosempresa._id, {
                solNombre: solnombre,
                solDocumento: soldocumento,
                solCodigo: solcodigo,
                solDireccion: soldireccion,
                solTelefono: soltelefono,
                solTelefono2: soltelefono2,
                solEmail: solemail,
                solIdFamiliar: solidfamiliar,
                solImagen: solimagen,
                solFechaNacimiento: solfechaNacimiento,
                solEstatura: solestatura,
                solPeso: solpeso,
                solGenero: solgenero,
                solBarrio: solbarrio,
                solCategoria: solcategoria,
                solTorneos: soltorneos,
                solBrazoDominante: solbrazoDominante,
                editNombre: editnombre,
                editDocumento: editdocumento,
                editCodigo: editcodigo,
                editDireccion: editdireccion,
                editTelefono: edittelefono,
                editTelefono2: edittelefono2,
                editEmail: editemail,
                editIdFamiliar: editidfamiliar,
                editImagen: editimagen,
                editFechaNacimiento: editfechaNacimiento,
                editEstatura: editestatura,
                editPeso: editpeso,
                editGenero: editgenero,
                editBarrio: editbarrio,
                editCategoria: editcategoria,
                editTorneos: edittorneos,
                editBrazoDominante: editbrazoDominante,
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false)
            upDateDates();
        } catch (e) {
            console.log(e.request)
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }


    const actualizarFormulario = () => {
        swal({
            title: '¿Actualizar permisos?',
            text: ('Estas a punto de modificar uno o más datos, si estas de acuerdo da en "Continuar".'),
            icon: 'info',
            buttons: ['Cancelar', 'Continuar'],
        }).then(res => {
            if (res) enviarDatos();
        })
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
            <div className='componentes w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                        <h2>
                            <b>Gestione los formularios para sus usuarios.</b>
                        </h2>
                        Para editar los campos por favor primero de clic en "Editar", luego haga los cambios que considere necesarios y clic en "Actualizar" para guardar.
                    </div>
                    <div>
                        {mostrar ?
                            <div className="w3-panel w3-right-align">
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => { setmostrar(false); setmostraredit(true) }}>
                                    Editar
                                </button>
                            </div>
                            :
                            <div className="w3-col w3-panel w3-right-align">
                                <button style={{ marginRight: '15px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={actualizarFormulario}>
                                    Actualizar
                                </button>
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => { setmostrar(true); setmostraredit(false) }}>
                                    Cancelar
                                </button>
                            </div>
                        }
                    </div>
                    {mostrar ?
                        <div style={{ maxWidth: '700px', margin: 'auto' }}>
                            <div>
                                <div className='w3-col m6'>
                                    <b className='w3-text-indigo'>Habilite o deshabilite los campos a solicitar para registro de nuevos usuarios</b><br /><br />
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solnombre} onChange={(e) => setsolnombre(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar nombre.</b>
                                    </label><br></br><br></br>
                                    {/*<label className="w3-text-indigo">
                                        <InputSwitch disabled checked={soldocumento} onChange={(e) => setsoldocumento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar documento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solcodigo} onChange={(e) => setsolcodigo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar código.</b>
                                    </label><br></br><br></br>*/}
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={soltelefono} onChange={(e) => setsoltelefono(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={soltelefono2} onChange={(e) => setsoltelefono2(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono (2).</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={soldireccion} onChange={(e) => setsoldireccion(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar Dirección.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solbarrio} onChange={(e) => setsolbarrio(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar barrio.</b>
                                    </label><br></br><br></br>
                                    {/*<label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solemail} onChange={(e) => setsolemail(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar email.</b>
                    </label><br></br><br></br>*/}
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solidfamiliar} onChange={(e) => setsolidfamiliar(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar id familiar.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solimagen} onChange={(e) => setsolimagen(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar Imagen.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solfechaNacimiento} onChange={(e) => setsolfechanacimiento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar fecha de nacimiento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solgenero} onChange={(e) => setsolgenero(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar género.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solpeso} onChange={(e) => setsolpeso(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar peso.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solestatura} onChange={(e) => setsolestatura(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar estatura.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solcategoria} onChange={(e) => setsolcategoria(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar categoría.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={soltorneos} onChange={(e) => setsoltorneos(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar torneos participados.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={solbrazoDominante} onChange={(e) => setsolbrazo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar brazo dominante.</b>
                                    </label><br></br><br></br>
                                </div>
                                <div className='w3-col m6'>
                                    <b className='w3-text-indigo'>Habilite o deshabilite los campos para permitir editar los datos de usuario</b><br /><br />
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editnombre} onChange={(e) => setnombre(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar nombre.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editdocumento} onChange={(e) => setdocumento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar documento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editcodigo} onChange={(e) => setcodigo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar código.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={edittelefono} onChange={(e) => settelefono(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar celular/teléfono.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={edittelefono2} onChange={(e) => settelefono2(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar celular/teléfono (2).</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editdireccion} onChange={(e) => setdireccion(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar dirección.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editbarrio} onChange={(e) => setbarrio(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar barrio.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editemail} onChange={(e) => setemail(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar email.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editidfamiliar} onChange={(e) => setidfamiliar(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar id familiar.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editimagen} onChange={(e) => setimagen(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar imagen.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editfechaNacimiento} onChange={(e) => setfechanacimiento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar fecha de nacimiento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editgenero} onChange={(e) => setgenero(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar género.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editestatura} onChange={(e) => setestatura(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar estatura.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editpeso} onChange={(e) => setpeso(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar peso.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editcategoria} onChange={(e) => setcategoria(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar categoría.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={edittorneos} onChange={(e) => settorneos(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar torneos participados.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch disabled checked={editbrazoDominante} onChange={(e) => setbrazo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar brazo dominante.</b>
                                    </label><br></br><br></br>
                                </div>
                            </div>
                            <div className="w3-col w3-panel w3-center">
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => { setmostrar(false); setmostraredit(true) }}>
                                    Editar
                                </button>
                            </div>
                        </div>
                        : null}
                    {mostraredit ?
                        <div style={{ maxWidth: '700px', margin: 'auto' }}>
                            <div>
                                <div className='w3-col m6'>
                                    <b className='w3-text-indigo'>Habilite o deshabilite los campos a solicitar para registro de nuevos usuarios</b><br /><br />
                                    <label className="w3-text-indigo w3-large">
                                        <InputSwitch checked={soltodo} onChange={(e) => setsoltodo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar todo.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo w3-large" onClick={desSolTodo}>
                                        <InputSwitch disabled />
                                        <b style={{ marginLeft: '20px' }}>Deshabilitar toda solicitud.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solnombre} onChange={(e) => setsolnombre(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar nombre.</b>
                                    </label><br></br><br></br>
                                    {/*<label className="w3-text-indigo">
                                        <InputSwitch checked={soldocumento} onChange={(e) => setsoldocumento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar documento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solcodigo} onChange={(e) => setsolcodigo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar código.</b>
                    </label><br></br><br></br>*/}
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={soltelefono} onChange={(e) => setsoltelefono(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={soltelefono2} onChange={(e) => setsoltelefono2(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono (2).</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={soldireccion} onChange={(e) => setsoldireccion(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar Dirección.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solbarrio} onChange={(e) => setsolbarrio(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar barrio.</b>
                                    </label><br></br><br></br>
                                    {/*<label className="w3-text-indigo">
                                        <InputSwitch checked={solemail} onChange={(e) => setsolemail(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar email.</b>
                    </label><br></br><br></br>*/}
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solidfamiliar} onChange={(e) => setsolidfamiliar(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar id familiar.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solimagen} onChange={(e) => setsolimagen(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar Imagen.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solfechaNacimiento} onChange={(e) => setsolfechanacimiento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar fecha de nacimiento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solgenero} onChange={(e) => setsolgenero(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar género.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solpeso} onChange={(e) => setsolpeso(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar peso.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solestatura} onChange={(e) => setsolestatura(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar estatura.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solcategoria} onChange={(e) => setsolcategoria(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar categoría.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={soltorneos} onChange={(e) => setsoltorneos(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar torneos participados.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={solbrazoDominante} onChange={(e) => setsolbrazo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Solicitar brazo dominante.</b>
                                    </label><br></br><br></br>
                                </div>
                                <div className='w3-col m6'>
                                    <b className='w3-text-indigo'>Habilite o deshabilite los campos para permitir editar los datos de usuario</b><br /><br />
                                    <label className="w3-text-indigo w3-large">
                                        <InputSwitch checked={edittodo} onChange={(e) => settodo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar todo.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo w3-large" onClick={desEditTodo}>
                                        <InputSwitch disabled />
                                        <b style={{ marginLeft: '20px' }}>Deshabilitar todo editable.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editnombre} onChange={(e) => setnombre(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar nombre.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editdocumento} onChange={(e) => setdocumento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar documento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editcodigo} onChange={(e) => setcodigo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar código.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={edittelefono} onChange={(e) => settelefono(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar celular/teléfono.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={edittelefono2} onChange={(e) => settelefono2(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar celular/teléfono (2).</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editdireccion} onChange={(e) => setdireccion(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar dirección.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editbarrio} onChange={(e) => setbarrio(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar barrio.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editemail} onChange={(e) => setemail(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar email.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editidfamiliar} onChange={(e) => setidfamiliar(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar id familiar.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editimagen} onChange={(e) => setimagen(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar imagen.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editfechaNacimiento} onChange={(e) => setfechanacimiento(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar fecha de nacimiento.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editgenero} onChange={(e) => setgenero(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar género.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editestatura} onChange={(e) => setestatura(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar estatura.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editpeso} onChange={(e) => setpeso(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar peso.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editcategoria} onChange={(e) => setcategoria(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar categoría.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={edittorneos} onChange={(e) => settorneos(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar torneos participados.</b>
                                    </label><br></br><br></br>
                                    <label className="w3-text-indigo">
                                        <InputSwitch checked={editbrazoDominante} onChange={(e) => setbrazo(e.value)} />
                                        <b style={{ marginLeft: '20px' }}>Editar brazo dominante.</b>
                                    </label><br></br><br></br>
                                </div>
                            </div>
                            <div className="w3-col w3-panel w3-center">
                                <button style={{ marginRight: '15px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={actualizarFormulario}>
                                    Actualizar
                                </button>
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => { setmostrar(true); setmostraredit(false) }}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}
