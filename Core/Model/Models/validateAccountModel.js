const pool = require('../DatabaseContext.js');
const accountTries = 3;

module.exports = class validateAccountModel {

    static async insertValidateAccountInstance(connection, userId, accountKey) 
    {
        var queryString = 'INSERT INTO `validate_account`(`userId`, `accountKey`, `verified`, `tries`) VALUES (?, ?, ?, ?)';
        var data = [userId, accountKey, false, accountTries]
        try{
            var [result, fields] = await connection.query(queryString, data);
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    static async tryValidateAccount(connection, userId, accountKey) {
        var queryString = 'SELECT `accountKey` FROM `validate_account` WHERE `userId` = ?;';
        var data = [userId]
        try{
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length && result[0].accountKey === accountKey) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async setValidAccountStatus(connection, userId) {
        var queryString = 'UPDATE `validate_account` SET `verified` = ? WHERE `userId` = ?;';
        var data = [true, userId]
        try{
            var [result, fields] = await connection.query(queryString, data);
            return Promise.resolve(true);
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async getNumberTries(connection, userId) {
        var queryString = 'SELECT `tries` FROM `validate_account` WHERE `userId` = ?;';
        var data = [userId]
        try{
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length) {
                return Promise.resolve(result[0].tries);
            }
            else
                return Promise.resolve(undefined)
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(undefined);
        }
    }

    static async setNumberTries(connection, userId, tries) {
        var queryString = 'UPDATE `validate_account` SET `tries` = ? WHERE `userId` = ?;';
        var data = [tries, userId]
        try{
            var [result, fields] = await connection.query(queryString, data);
            return Promise.resolve(true);
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async getAccountStatus(connection, userId) {
        var queryString = 'SELECT `verified` FROM `validate_account` WHERE `userId` = ?;';
        var data = [userId]
        try{
            var [result, fields] = await connection.query(queryString, data);
            if(Array.isArray(result) && result.length) {
                return Promise.resolve(result[0].verified);
            }
            else
                return Promise.resolve(undefined)
        }
        catch(e)
        {
            console.log(e);
            return Promise.resolve(undefined);
        }
    }
}