module.exports = {
    SECRET: 'text',
    jwtSecretReset: 'secreta',
    host: process.env.HOST_HTTP ? process.env.HOST_HTTP : 'http://localhost',
    uri: process.env.MONGODB_URI,
    uri_local: process.env.MONGODB_LOCAL,
    port: process.env.PORT? process.env.PORT : 4000,
    cli_host: process.env.CLI_HOST? process.env.CLI_HOST : 'http://localhost',
    cli_port: process.env.CLI_PORT? process.env.CLI_PORT : 3000,
    local: process.env.LOCAL? process.env.LOCAL: 0
};