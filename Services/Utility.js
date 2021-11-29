const uuidv4 = require('uuid');
const uniqid = require('uniqid');
module.exports = class Utility {
    
    static constructRequestDataAndExecuteCallback(request, response , callback) {
        var body = '';
        request.on('data', chunk => {
            body += chunk;
        }); 
        request.on('end', async () => { callback(body); });
    }

    static getSUID() {
        return uuidv4.v4();
    }

    static getUserAcountKey() {
        return uniqid();
    }
}
