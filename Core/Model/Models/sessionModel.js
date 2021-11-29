module.exports = class sessionModel {

    static async insertSessionUser(connection, userId, suid, sessionStart, sessionLastInteraction) 
    {
        var queryString = 'INSERT INTO `session_users`(`id_user`, `uuid`, `sessionStart`, `lastInteraction`) VALUES (?, ?, ?, ?)';
        var data = [userId, suid, sessionStart, sessionLastInteraction]
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