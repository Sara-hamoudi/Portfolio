const encrypt = require('./criypto');
const DBAccess = require('../db');
const auth = require('./auth');

/**
 * Register user (call for each registeration)
 * @param {string} name name of project
 * @param {string} date date of project
 *  @param {string} used_language used_language of project
 * @param {string} description description of project
 */
const createProject = (name, date, used_language, description) => {
    return new Promise(async (resolve, reject) => {
        try{
             let names = await DBAccess.project.getUserByName(name);
             if(names.length > 0 ) return reject({Status: false, Message: 'Username must be unique!', Data: null});
            let result = await DBAccess.project.createProject(name, date, used_language, description);
            resolve({Status: true, "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                        "Votre projet "+ name + " effectué le " + date + " a bien été enregistrer"
                    ]
                  }
                }
              ], Data: null});
        }catch(err){
            reject(err);
        }
    })
}

/**
 * Update user (call for Login)
 * @param {string} name name of project
 * @param {string} date date of project
 * @param {string} used_language used_language of project
 * @param {string} description description of project
 */
const updateProject = (nam, name, date, used_language, description) => {
    return new Promise(async (resolve, reject) => {
        try{
            let project = await DBAccess.project.getProjectByName(nam);

            if(project.length == 0 ) 
            return reject({Status: false, fulfillmentMessages: [   {
                "text": {
                "text": [
                    "Project doesn't exist!"
                ]
              }
            }], Data: null});
            if(name){ 
                await DBAccess.project.updateProject(nam, name,null,null,null);
            } if(date){
                await DBAccess.project.updateProject(nam,null, date,null,null);
            } if(used_language){
                await DBAccess.project.updateProject(nam,null,null, used_language,null);
            } if(description){
                await DBAccess.project.updateProject(nam,null,null,null, description);
            }
            resolve({Status: true, fulfillmentMessages: [   {
                "text": {
                "text": [
                  "Votre projet a bien été mis a jour."
                ]
              }
            }], Data: null});
        }catch(err){
            
            reject(err);
        }
    })
}


/**
 * Login for user
 * @param {string} name id of project
 */
const deleteProject = (name) => {
    return new Promise(async (resolve, reject) => {
        try{
             const name1 = await DBAccess.project.getProjectByName(name);
             console.log(name1.length == 0)
            if(name1.length == 0 )  // Is user exist?
                return reject({"fulfillmentMessages": [   {
                    "text": {
                    "text": [
                      "le projet " + name + " n'existe pas"
                    ]
                  }
                } ]});
            const response = await DBAccess.project.deleteProjectByName(name);
            resolve({Status: true, "fulfillmentMessages": [   {
                "text": {
                "text": [
                  "Le projet " + name + " a bien été supprimé."
                ]
              }
            } ], Data: response});
        }catch(err){
            reject({"fulfillmentMessages": [   {
                "text": {
                "text": [
                  "une erreur s'est produite"
                ]
              }
            } ]});
        }
    })
}


/**
 * Show Projects
 */
const showProjects = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let fulfillmentMessages= [   {
                "text": {
                "text": [
                  "Voici tout vos projets"
                ]
              }
            }];
            const response = await DBAccess.project.showProjects();
            
            for (let i = 0; i<response.length; i++){
                fulfillmentMessages.push({
                    "card": {
                    "title": response[i].name,
                    "subtitle": response[i].description,
                    "imageUri": response[i].id,
                    "buttons": [
                      {
                        "postback": response[i].date,
                        "text": response[i].used_Language,
                        
                      }
                    ],
                    "title": response[i].name,
                  },
                })
            }
           // console.log(response)
            //console.log(response)
            resolve({Status: true, fulfillmentMessages,  Projects: response[0].used_Language});
        }catch(err){
            reject(err);
        }
    })
}


/**
 * View Project
 */
const viewProject = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await DBAccess.project.getProjectbyid(id);
            if(response.length == 0 ) 
                reject({Status: true, Message: 'no existing project', Projects: response});
            resolve({Status: true, speech: 'This is the details', Projects: response});
        }catch(err){
            reject(err);
        }
    })
}



module.exports = {
    updateProject,
    createProject,
    deleteProject,
    showProjects,
    viewProject,
}