# Potluck Planner - backend

## Login/Registration Enpoints

[POST] - https://potluck3backend.herokuapp.com/api/auth/register  

:registers new user

  `required fields:`
  `first_name`,
  `last_name`,
  `email`,
  `password`

[POST] - https://potluck3backend.herokuapp.com/api/auth/login  

:logs new user in & generates a token

  `requires:`
  `email`,
  `password`

### ENDPOINTS BELOW THIS LINE REQUIRE USERS TO HAVE A TOKEN FOR IT TO WORK

[GET] - https://potluck3backend.herokuapp.com/api/auth  

:gets all  users in database

## Organizer Endpoints 

[GET] - https://potluck3backend.herokuapp.com/api/organizer/:user_id  

:gets all events belonging created by a user

[POST] - https://potluck3backend.herokuapp.com/api/organizer/event 

:creates a new event

  `required fields:`
  `event_title`,
  `organizer (which is the user_id)`,
  `event_location`,
  `event_description`,
  `event_date`

[PUT] - https://potluck3backend.herokuapp.com/api/organizer/event/:event_id 

:updates an event with an event_id

  `required fields:`
  `event_id`
  `event_title`,
  `organizer (generated with the user_id)`,
  `event_location`,
  `event_description`,
  `event_date`
