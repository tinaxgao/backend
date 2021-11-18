ENDPOINTS

## Login/Registration Enpoints

[POST] - https://lambdapotluck.herokuapp.com/api/auth/register  

:registers new user

  `required fields:`
  `first_name`,
  `last_name`,
  `email`,
  `password`

[POST] - https://lambdapotluck.herokuapp.com/api/auth/login  

:logs new user in & generates a token

  `requires:`
  `email`,
  `password`

### ENDPOINTS BELOW THIS LINE REQUIRE USERS TO HAVE A TOKEN FOR IT TO WORK

[GET] - https://lambdapotluck.herokuapp.com/api/auth  

:gets all  users in database

## Organizer Endpoints 

[GET] - https://lambdapotluck.herokuapp.com/api/organizer/:user_id  

:gets all events belonging created by a user

[POST] - https://lambdapotluck.herokuapp.com/api/organizer/event 

:creates a new event

  `required fields:`
  `event_title`,
  `event_location`,
  `event_description`,
  `event_date`

[POST] - https://lambdapotluck.herokuapp.com/api/organizer/event/:event_id 

:updates an event with an event_id

  `required fields:`
  `event_title`,
  `event_location`,
  `event_description`,
  `event_date`
