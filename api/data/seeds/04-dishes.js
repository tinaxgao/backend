exports.seed = async function(knex) {
  await knex('dishes').insert([
    {
      dish_name: 'turkey'
    },
    {
      dish_name: 'potatoes'
    },
    {
      dish_name: 'cake'
    }
  ])
};
