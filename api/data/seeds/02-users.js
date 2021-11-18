exports.seed = async function(knex) {
  await knex('users').insert([
    {
      first_name: 'Monica',
      last_name: 'Salas',
      email: 'ms@123.com',
      password: '1234'
    },
    {
      first_name: 'Sean',
      last_name: 'Terry',
      email: 'st@123.com',
      password: '1234'
    },
    {
      first_name: 'Tina',
      last_name: 'Gao',
      email: 'tg@123.com',
      password: '1234'
    }
  ])
}
