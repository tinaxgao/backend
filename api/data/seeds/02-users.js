exports.seed = async function(knex) {
  await knex('users').insert([
    {
      first_name: 'monica',
      last_name: 'salas',
      email: 'moni@123.com',
      username: 'monica',
      password: '1234'
    }
  ])
}
