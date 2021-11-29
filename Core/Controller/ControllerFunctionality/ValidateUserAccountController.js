const fs = require('fs');
const Utility = require('../../../Services/Utility.js');
const userModel = require('../../Model/Models/userModel.js');
const validateAccountModel = require('../../Model/Models/validateAccountModel.js');
const sendgridService = require('../../../Services/MailService/SendGridService.js');
const useTransaction = require('../../Model/DatabaseContext.js')

module.exports = class ActivateAccountController {

    static GET_ACTIVATE(request, response) {
        fs.readFile(__dirname + '../../../View/Activate-Account.html', 'utf8', function (err,data) {
            if (err) {
                response.statusCode= 500;
                response.send();
                return console.log(err);
            }
            response.statusCode = 200;
            response.send(data);
            response.end();
        });
    }

    static POST_ACTIVATE(request,response) {
        Utility.constructRequestDataAndExecuteCallback(request, response, async (body) => { 
            var key = JSON.parse(body).key;

            var connection = await useTransaction.getConnectionTransaction();
            var userId = await userModel.getUserIdByUsername(connection, request.params.username);
            var email = await userModel.getUserEmailByUsername(connection, request.params.username);

            if(userId !== undefined && email !== undefined) {
                var validKey = await validateAccountModel.tryValidateAccount(connection, userId , key);
                if(validKey) {
                    var validAccount = await validateAccountModel.setValidAccountStatus(connection, userId);
                    if(validAccount) {
                        response.statusCode = 202;
                        response.send('/Login.html')
                        response.end();
                        useTransaction.releaseConnectionTransaction(connection, 'success');
                        return ;
                    }
                }
                else
                {
                    var numberTries = await validateAccountModel.getNumberTries(connection, userId);
                    if(numberTries - 1 == 0) {
                        var deleteAccount = await userModel.deleteUserAccountById(connection, userId);
                        if(deleteAccount) {
                            var sentMail = await sendgridService.sendDeletedAccountMail(request.params.username, email);
                            if (sentMail) {
                                response.statusCode = 403;
                                response.cookie = undefined;
                                response.send('/Register.html');
                                response.end();
                                useTransaction.releaseConnectionTransaction(connection, 'success');
                                return ;
                            }
                        }
                    }
                    else {
                        var setTries = await validateAccountModel.setNumberTries(connection, userId, numberTries-1);
                        if(setTries) {
                            response.statusCode = 406;
                            response.end();
                            useTransaction.releaseConnectionTransaction(connection, 'success');
                            return ;
                        }
                    }
                }  
            }
            response.statusCode = 404;
            response.end();
            useTransaction.releaseConnectionTransaction(connection, 'error');
            return;
        });
    }
}
