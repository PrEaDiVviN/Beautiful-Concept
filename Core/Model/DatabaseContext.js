var mysql = require('mysql2/promise');
const config = require('./.env');

var pool  = mysql.createPool(config);

module.exports = class DatabaseContext {
    static async getConnection() {
        try{
            return await pool.getConnection();
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }

    static async releaseConnection(connection) {
        try {
            await connection.release();
            return Promise.resolve(true);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async getConnectionTransaction() {
        try { 
            var connection = await pool.getConnection();
            await connection.query('START TRANSACTION;');
            return connection;
        }
        catch(e){
            console.log(e);
            return null;
       }
    }

    static async releaseConnectionTransaction(connection, status) {
        try {
            if(status === 'success')
                await connection.query('COMMIT;');
            else
                await connection.query('ROLLBACK;');
            await connection.release();
            return Promise.resolve(true);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(false);
        }
    }
}