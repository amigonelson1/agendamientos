const rutas = {
    index: 'http://localhost:3000',  // esta sera la url raiz.
    server: 'http://localhost:4000/',  // la ruta del servidor.
    home: '/',
    password: '/new-password/*',
    admin: '/users/admin',
    profesor: '/users/profesor',
    canchero: '/users/ballboy',
    socio: '/users/socio',
    registro: 'registro',

    adminPagina: '/users/admin/pagina',
    adminImagenes: '/users/admin/imagenes',
    adminHorario: '/users/admin/horario',
    adminTodoHorarios: '/users/admin/todosloshorarios',
    adminAnuario: '/users/admin/anuario',
    adminHistorial: '/users/admin/historial',
    adminPermisos: '/users/admin/permisos',
    adminRegistro: '/users/admin/registro',
    adminUsers: '/users/admin/usuarios',
    adminMeUser: '/users/admin/miUsuario',
    adminAyuda: 'users/admin/ayuda',
    adminAcerca: 'users/admin/acerca',

    profesorUser: '/users/profesor/administrar',
    profesorPoliticas: 'users/profesor/politicas',

    cancheroUser: '/users/ballboy/administrar',

    socioUser: '/users/socio/administrar',
};

export default rutas;