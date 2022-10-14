import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import rutas from '../helpers/rutas';
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [roll, setRoll] = useState(null);
    const [datosempresa, setdatosempresa] = useState({})
    const [updatedates, setudd] = useState(false)
    const [timerSesion, settimer] = useState(false)
    const [instalador, setinstalador] = useState(false)

    const login = (userCredentials) => {
        setUser({ id: userCredentials.data.userFound._id, documento: userCredentials.data.userFound.documento, nombre: userCredentials.data.userFound.nombre, activo: userCredentials.data.userFound.activo, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token, cumple: userCredentials.data.userFound.fechaNacimiento });
        setRoll(userCredentials.data.userFound.rol[0].name);
        window.localStorage.setItem('sesionCitas', JSON.stringify({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, activo: userCredentials.data.userFound.activo, token: userCredentials.data.token, cumple: userCredentials.data.userFound.fechaNacimiento }));
    }

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Evita que aparezca la minibarra de información en el móvil.
            event.preventDefault();
            //console.log("👍", "beforeinstallprompt", event);
            // Guarde el evento para que pueda activarse más tarde.
            window.deferredPrompt = event;
            // Elimine la clase 'oculta' del contenedor del botón de instalación.
            setinstalador(true);
        });
    }, []);

    useEffect(() => {
        let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
        const traerDatosEmpresa = async () => {
            try {
                const res = await axios.get(rutas.server + 'api/empresa');
                let idEm = res.data.map(user => user._id).join();
                const datosEmpresa = await axios.get(rutas.server + 'api/empresa/configuracion/' + idEm);
                if (!ignore) {
                    if (datosEmpresa.data.message) {
                        setdatosempresa(datosEmpresa.data.message);
                    }
                }
            }
            catch (e) { /*if (!ignore) { }*/ }
        }
        traerDatosEmpresa();
        return () => { ignore = true };
    }, []);


    useEffect(() => {
        let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
        const traerDatosEmpresa = async () => {
            try {
                const res = await axios.get(rutas.server + 'api/empresa');
                let idEm = res.data.map(user => user._id).join();
                const datosEmpresa = await axios.get(rutas.server + 'api/empresa/configuracion/' + idEm);
                if (!ignore) {
                    if (datosEmpresa.data.message) {
                        setdatosempresa(datosEmpresa.data.message);
                    }
                }
            }
            catch (e) { /*if (!ignore) { }*/ }
        }

        traerDatosEmpresa();
        return () => { ignore = true };
    }, [updatedates]);



    useEffect(() => {
        const userLogueado = window.localStorage.getItem('sesionCitas')
        if (userLogueado) {
            const datosGuardados = JSON.parse(userLogueado);
            setUser(datosGuardados);
            setRoll(datosGuardados.role)
            const validarActivo = async () => {
                try {
                    await axios.get(rutas.server + 'api/users/' + datosGuardados.id
                        , {
                            headers: {
                                'x-access-token': datosGuardados.token,
                                'Content-Type': 'application/json'
                            }
                        });

                }
                catch (e) {
                    if (e.request.status === 401) {
                        logout();
                        return;
                    }
                }
            }
            validarActivo();
            reiniciarSesion(datosGuardados.id, datosGuardados.token)
        }
    }, [timerSesion])


    useEffect(() => {
        const userLogueado = window.localStorage.getItem('sesionCitas')
        if (userLogueado) {
            const datosGuardados = JSON.parse(userLogueado);
            setUser(datosGuardados);
            setRoll(datosGuardados.role)
            const validarActivo = async () => {
                try {
                    await axios.get(rutas.server + 'api/users/' + datosGuardados.id
                        , {
                            headers: {
                                'x-access-token': datosGuardados.token,
                                'Content-Type': 'application/json'
                            }
                        });

                }
                catch (e) {
                    if (e.request.status === 401) {
                        setUser(null);
                        setRoll(null);
                        window.localStorage.removeItem('sesionCitas');
                        navigate(rutas.home, { replace: true });
                        return;
                    }
                }
            }
            validarActivo();
            reiniciarSesion(datosGuardados.id, datosGuardados.token)
        }
    }, [navigate])


    const logout = () => {
        setUser(null);
        setRoll(null);
        window.localStorage.removeItem('sesionCitas');
        //navigate(rutas.home, { replace: true });
    }


    const upDateDates = () => {
        setudd(!updatedates);
    }


    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;


    const reiniciarSesion = async (id, token) => {
        try {
            const userCredentials = await axios.get(rutas.server + 'api/users/refrescar/' + id
                , {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json'
                    }
                });
            setUser({ id: userCredentials.data.user._id, documento: userCredentials.data.user.documento, nombre: userCredentials.data.user.nombre, activo: userCredentials.data.user.activo, role: userCredentials.data.user.rol[0].name, token: userCredentials.data.token, cumple: userCredentials.data.user.fechaNacimiento });
            setRoll(userCredentials.data.user.rol[0].name)
            window.localStorage.setItem('sesionCitas', JSON.stringify({ id: userCredentials.data.user._id, nombre: userCredentials.data.user.nombre, role: userCredentials.data.user.rol[0].name, activo: userCredentials.data.user.activo, token: userCredentials.data.token, cumple: userCredentials.data.user.fechaNacimiento }))
        }
        catch (e) {
            //console.log(e, 'error al reiniciar sesion')
        }

    }


    useEffect(() => {
        const tiempo = setTimeout(() => {
            settimer(!timerSesion)
        }, 1740000);
        return () => { clearTimeout(tiempo); }
    }, [timerSesion]);


    async function downloadApp() {
        //console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            // El aviso diferido no está disponible.
            //console.log("oops, no prompt event guardado en window");
            swal('Upss!!!', 'En estos momentos no pudimos hacer la instalación, intentalo mas tarde', 'info')
            return;
        }
        // Muestra el indicador de instalación.
        promptEvent.prompt();
        // Registrar el resultado
        //const result = await promptEvent.userChoice;
        await promptEvent.userChoice;
        // console.log("👍", "userChoice", result);
        // Restablezca la variable de solicitud diferida, ya que
        // prompt() solo se puede llamar una vez.
        window.deferredPrompt = null;
        // Ocultar el botón de instalación.
        setinstalador(false);
    }

    const contextValue = {
        user,
        roll,
        datosempresa,
        updatedates,
        instalador,
        isLogged,
        hasRole,
        login,
        logout,
        upDateDates,
        downloadApp
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
