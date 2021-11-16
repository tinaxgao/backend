exports.seed = async function(knex) {
  await knex('items').insert([
    {
      event_id: 1,
      user_id: 1,
      item_name: 'turkey'
    }
  ])
}
