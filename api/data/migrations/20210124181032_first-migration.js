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
    .createTable('events', (event) => {
      event.increments('event_id')
      event.integer('organizer', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      event.string('event_title', 200).notNullable()
      event.string('event_location', 200).notNullable()
      event.string('event_description', 200)
      event.timestamps(false, true)
    })
    .createTable('guests', (guest) => {
      guest.increments('guest_id')
      guest.integer('user_id', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      guest.integer('event_id', 200)
        .notNullable()
        .unsigned()
        .references('event_id')
        .inTable('events')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      guest.string('dish', 200).notNullable()
      guest.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('guests')
    .dropTableIfExists('events')
    .dropTableIfExists('users')
}
