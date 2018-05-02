const fs = require('fs');

let adminrole = require('./AdminRole'),
    admin = adminrole.admin,
    adminid = adminrole.adminid;

module.exports = async (bot) => {
    for (let g of bot.guilds) {
        for (let i = 1; i < g.length; i += 2) {
            let foundRole = false;
            for (let rs of g[i].roles) {
                for (let j = 1; j < rs.length; j += 2){
                    let r = rs[j];
                    if (r.name == admin) {
                        if (r.id == adminid) {
                            console.log('role is exact same...');
                            foundRole = true;
                            break;
                        }
                        console.log(`Admin name is taken on ${g[i].name} server, please change admin name with config command`);
                        foundRole = true;
                        break;
                    } else {
                        if (r.id == adminid) {
                            console.log('editing current role...');
                            r.edit({ name: admin });
                            foundRole = true;
                            break;
                        }
                    }
                }
            }
            if (!foundRole) {
                console.log('adding new role...');
                let newrole = await g[i].createRole({ name: admin });
                adminid = newrole.id;
                
            }
        }
    }
}