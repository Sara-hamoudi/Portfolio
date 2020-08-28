/**
 * Checking of creation project parameters
 * @param {string} name name of project
 * @param {string} date date of project
 * @param {string} used_language used_language of project
 * @param {string} description description of project
 */
const createProjectValidator = (name,date,used_language, description) => {
    if(!name || !date || !used_language || 
       !description ||
       (name.trim().length < 3 )||  // Username must be grather than 5
       (date.trim().length < 2 )||
       (used_language.trim().length < 3 )||
       (description.trim().length < 4 )
        ) return false;
    return true;
}

/**
 * Checking of deleting parameters
 * @param {number} id name of project
 */
const deletebyidValidator = (id) => {
    if(!id)  {
        return false;
    }
    return true;
}

/**
 * Checking of deleting parameters
 * @param {string} name id of project
 */
const deletebynameValidator = (name) => {
    if(!name || 
       (name.trim().length < 3 )
        ) return false;
    return true;
}

module.exports = {
    createProjectValidator,
    deletebyidValidator,
}