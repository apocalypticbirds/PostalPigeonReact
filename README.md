### Start front-end
open project directory in terminal and call next command:
`npm start`

### Front-end Logs
 Created Project in React.js

 Added new dependecise

 App.js is enter to the app

 Created MainPage component
 
 Created LoginPage component

 Created styled component for LoginPage component

 Created LogoutPage component

 Created ChatGroup component

 Created LandingPage component

 Created Navigation component

 Created SearchPage component

 Above components binded

 Bootstrap lib added

 Test data added to App.js

 In App.js added props and callback for test data edit. Child components get props and use it.

Sprint 3 ######################################
 Appolo library added to project.
 This lib responsible for connection to backend.
 It has advantages like user`s cache using. It give us possibility to accumulate data by users side and load data
 from server once. Or for example collect data when user has not internet.

Appolo implemented for message sending 

Appolo implemented for conversation getting 

Sprint 5 ######################################
Login page added
Catching token userid and time for token
Blocked access for not autorized users
Sending and catching messages to/from server

 ### Back-End Logs
Created new repo for backend

Created Node.js project

Added Express lib

Added GraphQL lib

Added Mongodb database

Implemented GraphQL schema 

Added chai and mocha libs for test`s purpuses

Travis CI for automated tests

Endpoints implemented

Sprint 3###########################
Database structure rebuilt (optimization purposes)

Conversation creating functionality added to server

Message creating functionality added to server

Created functionality for getting messages from the server

Created functionality for getting conversation from the server

Sprint 5############################
Authentification added by server side
tokens generate and send to client

Bot added, it filtering bad words and catch tags in text

Server can't be tested now from graphiql. Postman is required.
Postman request example:
Type: POST
URL: http://localhost:4000/graphql
Headers:
    Key:Content-type
    value:application/json

    Key: Authorization
    value: Bearer <Valid token>

Body:
{
	"query": "query {login(email:\"bartek@gmail.com\", password:\"passw0rd\") {token}}"
}

{
	"query": "query {conversations {id, name}}"
}

Sprint 6############################
Registration added by server side. email and nickname should be unique.
Protected before empty fields. It return data about registration user.

