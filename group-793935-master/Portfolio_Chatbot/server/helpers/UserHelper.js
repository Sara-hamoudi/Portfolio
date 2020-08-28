const encrypt = require('./criypto');
const DBAccess = require('../db');
const auth = require('./auth');

/**
 * Register user (call for each registeration)
 * @param {string} name username of user
 * @param {string} username password of user
 *  @param {string} email username of user
 * @param {string} password password of user
 */
const createUser = (name, username, email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let criypted_password = encrypt(password);
            let users = await DBAccess.user.getUserByUsername(username);
            if(users.length > 0 ) return reject({Status: false, Message: 'Username must be unique!', Data: null});
            let result = await DBAccess.user.addUser(name, username, email, criypted_password);
            resolve({Status: true, Message: 'User register successfully!', Data: null});
        }catch(err){
            reject(err);
        }
    })
}

/**
 * Update user (call for Login)
 * @param {string} Email
 * @param {string} username username of user
 */
const updateUser = (id, username) => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = await DBAccess.user.getUserById(id);
            if(users.length == 0 ) 
            return reject({Status: false, Message: "Account doesn't exist!", Data: null});
            await DBAccess.user.updateUsername(id, username);
            let user = await DBAccess.user.getUserById(id);
         // console.log(result)
            resolve({Status: true, Message: 'User updated successfully!', Data: null, User:user});
        }catch(err){
            reject(err);
        }
    })
}


/**
 * Login for user
 * @param {string} username is username of user
 * @param {string} password password of user
 */
const loginUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            const users = await DBAccess.user.getUserByUsername(username);
            if(users.length == 0 )  // Is user exist?
                return reject({Status: false, Message: 'There is no user with this username !', Data: null});
            const criypted_password = encrypt(password);
            if(users[0].password != criypted_password) // Is password valid?
                return reject({Status: false, Message: 'The password is wrong!', Data: null});
            const token = auth.createToken(users[0].id, username); // Createing token
            const response_data = {
                access_token : token,
                id: users[0].id
            }
            resolve({Status: true, Message: 'User connected successfully!', Data: response_data,"fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                        response_data.access_token
                    ]
                  }
                }
              ], });
        }catch(err){
            reject(err);
        }
    })
}



module.exports = {
    createUser,
    updateUser,
    loginUser
}