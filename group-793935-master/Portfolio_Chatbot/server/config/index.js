
module.exports = {
    mysql : {
        host: '127.0.0.1',
        user: 'root',
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
        password:'root',
        database: 'portfolio',
        insecureAuth : true,
        dateStrings : true,
        charset : 'utf8mb4'
    },
    SECRET_KEY: 'asdfhjtrr',
    CRYPTO_FUNC : 'sha256',
    CRYPTO_DIGEST : 'hex',
    PORT: 8000
}