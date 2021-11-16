exports.seed = async function(knex) {
  await knex('potluck_users').insert([
    {
      event_id: 1,
      user_id: 1
    }
  ])
}
