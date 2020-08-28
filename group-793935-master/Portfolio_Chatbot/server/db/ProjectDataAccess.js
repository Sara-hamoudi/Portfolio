const DB = require("./connection");

/**
 * Get user by username ()
 * @param {string} user_id is username of user
 */
const getProjectbyuserid = (user_id) => {
  return DB("Projects").where("userId", user_id);
};

/**
 * Get user by email ()
 * @param {string} name is email of user
 */
const getUserByName = (name) => {
  return DB("Projects").where("name", name);
};



/**
 * Get project by id ()
 * @param {number} id is email of user
 */
const getProjectbyid = (id) => {
  return DB("Projects").where("id", id);
};

/**
 * Get project by id ()
 * @param {number} name is email of user
 */
const getProjectByName = (name) => {
  return DB("Projects").where("name", name);
};



/**
 * Add user to users table (call for each registeration)
 * @param {string} name is name of user
 * @param {string} date is username of user
 *  @param {string} used_language is email of user
 * @param {string} password is password of user
 */
const createProject = (name, date, used_language, description) => {
  return DB("Projects").insert({
    name,
    date,
    used_language,  
    description,
    createdAt: new Date(),
    updatedAt:new Date()
  });
};

/**
 * Update user by User Email
 * @param {string} description is searched user Email and updated by param usern
 * @param {string} nam
 * @param {string} name 
 * @param {any} date
 * @param {string} used_language is put by user updated
 */
const updateProject = (nam, name, date, used_language, description) => {
    if (name) {
      
        return DB("Projects")
        .where("name", nam)
        .update({
         name: name,
         updatedAt:new Date()
        })
    }if (date) {
        return DB("Projects")
        .where("name", nam)
        .update({
            date: date,
         updatedAt:new Date()
        })
    }if (used_language) {
        return DB("Projects")
        .where("name", nam)
        .update({
        used_language: used_language,
         updatedAt:new Date()
        })
    }if (description) {
        return DB("Projects")
        .where("name", nam)
        .update({
         description: description,
         updatedAt:new Date()
        })
    }
   
}

/**
 * Delete project by id
 * @param {number} id is deleted user id
 */
const deleteProjectById = (id) => {
  return DB("Projects").where("id", id).del();
};

/**
 * Delete project by name
 * @param {string} name is deleted user id
 */
const deleteProjectByName = (name) => {
    return DB("Projects").where("name", name).del();
  };

const showProjects = () =>{
    // const eu = DB.select("*").from("Projects");
    // console.log(eu)
    return DB.select("*").from("Projects")
}



module.exports = {
  getProjectbyid,
  updateProject,
  getUserByName,
  getProjectbyuserid,
  deleteProjectById,
  deleteProjectByName,
  createProject,
  showProjects,
  getProjectByName
  
};
