const api = "http://pokeapi.co/api/v2/pokemon/1/",
    fetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    fetch.get(api).then(console.log);
};

module.exports.help = {
    name: "api"
};