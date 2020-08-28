const DB = require("./connection");

/**
 * Get user by username ()
 * @param {string} username is username of user
 */
const getUserByUsername = (username) => {
  return DB("users").where("username", username);
};

/**
 * Get user by email ()
 * @param {string} email is email of user
 */
const getUserByEmail = (email) => {
  return DB("users").where("Email", email);
};

/**
 * Get user by email ()
 * @param {string} id is email of user
 */
const getUserById = (id) => {
  return DB("users").where("id", id);
};

/**
 * Add user to users table (call for each registeration)
 * @param {string} name is name of user
 * @param {string} username is username of user
 *  @param {string} email is email of user
 * @param {string} password is password of user
 */
const addUser = (name, username, email, password) => {
  return DB("users").insert({
    name,
    username,
    email,  
    password,
    createdAt: new Date(),
    updatedAt:new Date()
  });
};

/**
 * Update user by User Email
 * @param {string} Email is searched user Email and updated by param usern
 * @param {string} usern is put by user updated
 */
const updateUsername = (id, usern) => {
    return DB("users")
            .where("id", id)
            .update({
             username: usern,
             updatedAt:new Date()
      })
}


/**
 * Get user info without password
 * @param {number} id is user id
 */
const getUserByIdForWithoutPassword = (id) => {
  return DB("users").where("id", id)
  .where('id', id)
  .select('id')
  .select('username')
  .select('admin');
}

/**
 * Deleteing user by id
 * @param {number} id is deleted user id
 */
const deleteUserById = (id) => {
  return DB("users").where("id", id).del();
};

/**
 * Get all users without the user
 * @param {number} user_id user id which is take the datas
 */
const getUserWitoutUser = (user_id) => {
  return DB('users')
          .where('id', '!=', user_id)
          .select('id')
          .select('username')
          .select('admin');
}

module.exports = {
  getUserByUsername,
  addUser,
  getUserById,
  deleteUserById,
  getUserWitoutUser,
  getUserByIdForWithoutPassword,
  updateUsername,
  getUserByEmail
};
