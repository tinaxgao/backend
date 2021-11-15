exports.seed = async function(knex) {
  await knex('items').insert([
    {
      potluck_id: 1,
      user_id: 1,
      item_name: 'turkey'
    }
  ])
}
