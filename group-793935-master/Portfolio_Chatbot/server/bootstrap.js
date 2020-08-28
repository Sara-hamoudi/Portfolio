module.exports = async () => {

    const Users = require("./models/Users");
    const Projects = require("./models/Projects");

    Users.hasMany(Projects, { as: "Projects", foreighkey: 'userId'});
    Projects.belongsto(Users, { as:"Users", foreighkey: "userId"});

    const errHandler = (err)=>{
        console.error("Error", err)
    };

  const user = await  Users.create({name: "poulet2.0", password: "blabla20", email: "poulet20@gmail.com"}).catch(errHandler);
  const project = await  Projects.create({name: "laravel", used_language: "Laravel, mysql", description:"C'était un super projet de ouf ca mère",userId: user.id}).catch(errHandler);

 const users = Users.findAll({ where: {username: 'poulet2.0'}, include:[ {model: Projects, as:"Projects"} ] }).catch(errHandler);

 console.log("poulet 2.0 Projects:", users)
}