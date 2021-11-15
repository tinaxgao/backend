exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('first_name', 200).notNullable()
      users.string('last_name', 200).notNullable()
      users.string('email', 200).notNullable()
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('potlucks', (potlucks) => {
      potlucks.increments('potluck_id')
      potlucks.string('potluck_title', 200).notNullable()
      potlucks.string('potluck_location', 200).notNullable()
      potlucks.string('potluck_description', 200)
      potlucks.binary('image', 200)
      potlucks.integer('organizer', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      potlucks.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('potlucks')
    .dropTableIfExists('users')
}
