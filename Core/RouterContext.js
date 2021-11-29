module.exports = class RouterCountext {
    static injectRouters(expressApplication) {
        const RegisterControllerContext = require('./Controller/ControllerContext/RegisterControllerContext.js');
        const ValidateAccountControllerContext = require('./Controller/ControllerContext/ValidateUserAccountControllerContext.js');
        const LoginAccountControllerContext = require('./Controller/ControllerContext/LoginControllerContext.js');
        const PublicRouter = require('./PublicRouter.js');
        expressApplication.use(RegisterControllerContext);
        expressApplication.use(ValidateAccountControllerContext);
        expressApplication.use(LoginAccountControllerContext);
        expressApplication.use(PublicRouter);
    }
}