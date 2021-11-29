const fs = require('fs');
const Utility = require('../../../Services/Utility.js');
const useTransaction = require('../../Model/DatabaseContext.js');
const userModel = require('../../Model/Models/userModel.js');
const sessionModel = require('../../Model/Models/sessionModel.js');
const validateAccountModel = require('../../Model/Models/validateAccountModel.js');


module.exports = class LoginController {

    static POST_LOGIN(request,response) {
        Utility.constructRequestDataAndExecuteCallback(request, response, async (body) => { 
            var username = JSON.parse(body).username;
            var password = JSON.parse(body).password;

            var connection = await useTransaction.getConnectionTransaction();
            var passwordUser = await userModel.getUserPasswordByUsername(connection, username);

            if(passwordUser === password) {
                var userId = await userModel.getUserIdByUsername(connection, username);
                if(userId !== undefined) {
                    var accountStatus = await validateAccountModel.getAccountStatus(connection, userId);
                    if(accountStatus == true) {
                        var SUID = Utility.getSUID();
                        var sessionStart = new Date(Date.now() + (24 * 3600000));
                        var sessionLastInteration = sessionStart;
                        var startUserSession = await sessionModel.insertSessionUser(connection, userId, SUID, sessionStart, sessionLastInteration);
                        if(startUserSession === true) {
                            response.clearCookie('SUID');
                            response.clearCookie('username');
                            response.clearCookie('email');    
                            response.cookie('username', escape(username), { expires: new Date(Date.now() + (24 * 3600000)), httpOnly: true });
                            response.cookie('SUID', escape(SUID), { expires: new Date(Date.now() + (24 * 3600000)), httpOnly: true });
                            response.statusCode = 200;
                            response.end();

                            await useTransaction.releaseConnectionTransaction(connection, 'success');
                            return;
                        }
                    }
                    else {
                        response.statusCode = 401;
                        response.end();
                        await useTransaction.releaseConnectionTransaction(connection, 'error');
                        return;
                    }
                }
                response.statusCode = 500;
                response.end();
                await useTransaction.releaseConnectionTransaction(connection, 'error');
                return;
            }
            else {
                if (passwordUser === undefined) {
                    response.statusCode = 404;
                    response.end();
                    await useTransaction.releaseConnectionTransaction(connection, 'error');
                    return;
                }
                response.statusCode = 403;
                response.end();
                await useTransaction.releaseConnectionTransaction(connection, 'error');
                return;
            } 
        });  
    }
}
