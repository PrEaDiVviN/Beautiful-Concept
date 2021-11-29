const sendgridEmailService = require('@sendgrid/mail');
const settings = require('./.env');

sendgridEmailService.setApiKey(settings.ApiKey);

module.exports = class SendGridService {
    static async sendActivationAccountEmail(username, userToken, email, activationRoute) {
        const activationEmail = {
            to: email,
            from: settings.Sender,
            subject: 'Activation Token for your Beautiful Concept Account!',
            html: 
            `<html>
                <head></head>
                <body>
                    <p> 
                        Welcome to Beautiful Concept, ${username}! We are glad that you joined us on our jurney.<br>
                        We hope you will love our website and you will stay with us as long as posibble for you.<br>
                        <hr>
                        Here is your activation token: <strong>${userToken}</strong>.
                        <hr> 
                        <a href="${settings.WebAddress}/${activationRoute}/${username}">Activation Link</a>
                        If you did not create an account on our website, ignore this message.
                    </p>
                </body>
            </html>`
        };
        try {
            await sendgridEmailService.send(activationEmail);
            console.log(`Activation Email sent to ${email}.`);
            return Promise.resolve(true);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(false);
        }
    }

    static async sendDeletedAccountMail(username, email) {
        const activationEmail = {
            to: email,
            from: settings.Sender,
            subject: 'Account deleted from Beautiful Concept Website!',
            html: 
            `<html>
                <head></head>
                <body>
                    <p> 
                        Hello, ${username}! We are sorry to tell you that your account was deleted due to more than 3 times failing to activate it.
                        <hr>
                        We reccommend you to use another email address if you don't have access at the one you used right now.
                        <hr> 
                        If you did not try to create an account on our website, ignore this message.
                    </p>
                </body>
            </html>`
        };
        try {
            await sendgridEmailService.send(activationEmail);
            console.log(`Detele Account Email sent to ${email}.`);
            return Promise.resolve(true);
        }
        catch(e) {
            console.log(e);
            return Promise.resolve(false);
        }
    }
}