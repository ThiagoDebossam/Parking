const congifg = require('../knexfile.js')
const knex = require('knex')(congifg)
knex.migrate.latest([congifg])
module.exports = knex