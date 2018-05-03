const fs = require('fs');

let adminjson = require('./../config/admin'),
    admin = adminjson["admin-role-name"],
    adminid = adminjson["admin-role-id"];

module.exports = async (bot) => {
    for (let g of bot.guilds) {
        for (let i = 1; i < g.length; i += 2) {
            let foundRole = false;
            for (let rs of g[i].roles) {
                for (let j = 1; j < rs.length; j += 2){
                    let r = rs[j];
                    if (r.name == admin) {
                        if (r.id == adminid) {
                            foundRole = true;
                            break;
                        }
                        console.log(`Admin name is taken on ${g[i].name} server, please change admin name with config command`);
                        foundRole = true;
                        break;
                    } else {
                        if (r.id == adminid) {
                            r.edit({ name: admin });
                            foundRole = true;
                            break;
                        }
                    }
                }
            }
            if (!foundRole) {
                if (!admin) admin = "musician";
                let newrole = await g[i].createRole({ name: admin });
                // adminid = newrole.id;
                let jsontemp = {
                    "admin-role-name": admin,
                    "admin-role-id": newrole.id
                }
                fs.writeFile('./config/admin.json', JSON.stringify(jsontemp, null, 2), err => {
                    if (err) throw err;
                });
            }
        }
    }
}