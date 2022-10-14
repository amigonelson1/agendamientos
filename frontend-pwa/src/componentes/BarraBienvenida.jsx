import React, { useEffect, useState } from 'react'
import useAuth from '../auth/useAuth'
import happyB from '../imagenes/happyB.gif';

export default function BarraBienvenida() {

    const { user } = useAuth();
    const [mostrar, setmostrar] = useState(false)
    const [cumple, setcumple] = useState(new Date(user.cumple).getMonth() + '/' + new Date(user.cumple).getDate())
    const [ver, setver] = useState(true)

    useEffect(() => {
        if (cumple !== '' || cumple !== null) {
            setcumple(new Date(user.cumple).getMonth() + '/' + new Date(user.cumple).getDate())
            let hoy = (new Date().getMonth() + '/' + new Date().getDate())
            if (cumple === hoy) { setmostrar(true) }
        }
    }, [user.cumple, cumple])


    return (
        <div>
            {user ?
                <div className=" w3-metro-dark-purple">
                    <div style={{ zIndex: '0' }} className="w3-container w3-metro-dark-purple">
                        <div className='w3-right' title='Recuerda que para cambiar a estado "Activo" debes contactar con el administrador.' >
                            Bienvenido < b > {user.nombre}</b > tu estado: <b>{user.activo ? 'Activo' : 'Inactivo'}</b>
                        </div >
                    </div>
                    {mostrar ?
                        <div className='w3-pink'>
                            {ver ?
                                <div onClick={e => setver(false)} style={{ cursor: 'pointer' }}>
                                    <div className='w3-center'>
                                        <h3 style={{ marginBottom: '-5px' }}>Hoy queremos decirte que...</h3>
                                        (clic para ocultar)
                                    </div>
                                    <div className='w3-hide-small w3-hide-medium w3-center-align'>
                                        <div className='w3-col m3'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                        <div className='w3-col m3'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                        <div className='w3-col m3'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                        <div className='w3-col m3'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                    </div>
                                    <div className='w3-hide-small w3-hide-large w3-center-align'>
                                        <div className='w3-col m4'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                        <div className='w3-col m4'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                        <div className='w3-col m4'>
                                            <img src={happyB} width={'100%'} alt='gif de felicitaciones'
                                                title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%' }} className='w3-hide-medium w3-hide-large'>
                                        <img src={happyB} width={'100%'} height={'100%'} alt='gif de felicitaciones'
                                            title='tomado de: https://giphy.com/gifs/bancocuscatlan-cuscatlan-cusca-cuscatln-II9aMQR8ghU4Qj8XRL?utm_source=iframe&utm_medium=embed&utm_campaign=Embeds&utm_term=http%3A%2F%2Flocalhost%3A3000%2F' />
                                    </div>
                                </div> :
                                <div onClick={e => setver(true)} className='w3-center' style={{ cursor: 'pointer' }}>
                                    Te queremos decir que...(clic aquí)
                                </div>}
                        </div>
                        : null}
                </div>
                : null
            }
        </div>
    )
}

