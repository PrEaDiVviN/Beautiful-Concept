const fs = require('fs');
const Utility = require('../../../Services/Utility.js');
const useTransaction = require('../../Model/DatabaseContext.js');
const userModel = require('../../Model/Models/userModel.js');
const validateAccountModel = require('../../Model/Models/validateAccountModel.js');
const sendgridService = require('../../../Services/MailService/SendGridService.js');

module.exports = class RegisterController {

    static POST_REGISTER(request,response) {
        Utility.constructRequestDataAndExecuteCallback(request, response, async (body) => { 
            var username = JSON.parse(body).username;
            var password = JSON.parse(body).password;
            var email = JSON.parse(body).email;
            var firstname = JSON.parse(body).firstname;
            var lastname = JSON.parse(body).lastname;
            var birthdate = JSON.parse(body).birthdate;
            var sex = JSON.parse(body).sex;
            var type = JSON.parse(body).type;

            var connection = await useTransaction.getConnectionTransaction();

            var existsUser = await userModel.verifyUserExistence(connection, username, 'username');
            if(!existsUser) {
                var insertedUser = await userModel.insertUserIntoDatabase(connection, username, email, password, firstname, lastname, birthdate, sex, type);
                if(insertedUser) {
                    var userId = await userModel.getUserIdByUsername(connection, username);
                    if(userId !== undefined) {
                        var accountKey = Utility.getUserAcountKey();
                        var insertedValidate = validateAccountModel.insertValidateAccountInstance(connection, userId, accountKey);
                        if(insertedValidate) {
                            var sentMail = await sendgridService.sendActivationAccountEmail(username, accountKey, email, 'Activate-Account');
                            if (sentMail) {
                                response.statusCode = 201;
                                response.cookie('username', escape(username));
                                response.cookie('email', escape(email));
                                response.send('/Activate-Account/' + username);
                                response.end();
                                
                                useTransaction.releaseConnectionTransaction(connection, 'success');
                                return;
                            }
                        }
                    }
                }
                response.statusCode = 503;
                response.send('/Service-Unavailable');
                response.end();
            }
            else
            {
                response.statusCode = 409;
                response.end();
            }
            await useTransaction.releaseConnectionTransaction(connection, 'error');
            return;
        });  
    }
}
