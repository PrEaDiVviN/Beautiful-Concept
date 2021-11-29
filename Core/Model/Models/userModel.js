const pool = require('../DatabaseContext.js');

module.exports = class userModel {
    
    /**
     * Inserts a user in the database if he does not exists already.
     * @param {String} username 
     * @param {String} email 
     * @param {String} passw0rd 
     * @param {String} firstname 
     * @param {String} lastname 
     * @param {Date} birthdate 
     * @param {String} sex 
     * @param {String} type 
     * @returns Bool
     */
    static async insertUserIntoDatabase(connection, username, email, password, firstname, lastname, birthdate, sex, type) {
        var queryString = 'INSERT INTO `users`(`username`, `email`, `passw0rd`, `firstname`, `lastname`, `birthdate`, `sex`, `type` ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        var data = [username, email, password, firstname, lastname, birthdate, sex, type];
        try {
            await connection.query(queryString, data);
            return Promise.resolve(true);
        }
        catch(e) {
            console.log(e)
            return Promise.resolve(false);
        }
    }

    /**
     * Verify if a user exists in the database of not based on one of his identifiers.
     * @param { String } userIdentifier Its the user identifier. 
     * @param { 'user_id' } identifierType Its the user type.
     * @returns Bool
     */
    static async verifyUserExistence(connection, userIdentifier, identifierType = 'username') {
        var queryString = 'SELECT username FROM users WHERE ' + (identifierType === 'username' ? 'username' : identifierType) + ' = ?;';
        var data = [userIdentifier];
        try {
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length)
                return Promise.resolve(true);
            return Promise.resolve(false);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async getUserIdByUsername(connection, username) {
        var queryString = 'SELECT userId FROM users WHERE username = ?;';
        var data = [username];
        try {
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length) {
                return Promise.resolve(result[0].userId);
            }
            else
                return Promise.resolve(undefined);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(undefined);
        }
    }

    static async getUserEmailByUsername(connection, username) {
        var queryString = 'SELECT email FROM users WHERE username = ?;';
        var data = [username];
        try {
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length) {
                return Promise.resolve(result[0].email);
            }
            else
                return Promise.resolve(undefined);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(undefined);
        }
    }

    static async getUserPasswordByUsername(connection, username) {
  
            var queryString = 'SELECT passw0rd FROM users WHERE username = ?;';
            var data = [username];
            try{
                var [result, fields] = await connection.query(queryString, data);
                return Promise.resolve(result[0].passw0rd);
            }
            catch(e)
            {
                console.log(e);
                return Promise.resolve(undefined);
            }
    }

    static async deleteUserAccountById(connection, userId) {
        var queryString = 'DELETE FROM `users` WHERE userId = ?;';
        var data = [userId];
        try{
            await connection.query(queryString, data);
            return Promise.resolve(true);
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(false);
        }
    }
} 