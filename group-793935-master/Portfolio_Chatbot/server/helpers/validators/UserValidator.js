/**
 * Checking of registeration parameters
 * @param {string} FirstName username of user
 * @param {string} LastName username of user
 * @param {string} Email username of user
 * @param {string} password password of user
 */
const createUserValidator = (name,username,Email, password) => {
    if(!name || !username || !Email || 
       !password ||
       (name.trim().length < 6 )||  // Username must be grather than 5
       (username.trim().length < 2 )||
       (Email.trim().length < 6 )||
       (password.trim().length < 6 )||  // Password must be grather than 5// Username cannot contain space
       (Email.trim() != Email) ||
       (password.trim() != password)    // Password cannot contain space
        ) return false;
    return true;
}
/**
 * Checking of registeration parameters
 * @param {string} username username of user
 * @param {string} password password of user
 */
const createLoginValidator = (username, password) => {
    if(!username || 
       !password ||
       (username.trim().length < 3 )||  // Username must be grather than 5
       (password.trim().length < 3 )||  // Password must be grather than 5
       (username.trim() != username) || // Username cannot contain space
       (password.trim() != password)    // Password cannot contain space
        ) return false;
    return true;
}
/**
 * Checking of registeration parameters
 * @param {string} Email username of user
 * @param {string} username password of user
 */
const usernameValidator = (username, password) => {
    if(!password || 
       !username || 
       (username.trim() != username)   // Password cannot contain space
        ) return false;
    return true;
}

module.exports = {
    createUserValidator,
    usernameValidator,
    createLoginValidator
}