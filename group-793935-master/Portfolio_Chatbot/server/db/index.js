 const ProjectDB = require('./ProjectDataAccess');
const UserDB = require('./UserDataAccess');

module.exports = {
     project: ProjectDB,
    user: UserDB
}