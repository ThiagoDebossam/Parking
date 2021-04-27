
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cars', table => {
        table.increments('id').primary()
        table.string('model').notNull()
        table.string('score').notNull()
        table.string('dateAndHour').notNull()
        table.timestamp('deletedAt')
        table.integer('userId').references('id')
            .inTable('users')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cars')
};