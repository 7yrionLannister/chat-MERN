# server

## Configuration

Create a `.env` file in this folder and set the following attributes.

### PORT

The port the web server will be running. Defaults to 5000 if it is not provided.

### MONGO_URI

The URL/URI to connect to your MongoDB database.

### TOKEN_KEY

A randomly generated string to use when signing and verifying JWT tokens.

## Installing and running

Run `npm install` to download and install all the dependencies of `package.json`

Run `npm start` and a web server will start in `http://localhost:PORT`.\
This server provides a REST API with the following endpoints.

| Path                          | Method(s) | Requires authentication? |
| ----------------------------- | --------- | ------------------------ |
| /api/users/login              | POST      | No                       |
| /api/users/                   | POST      | No                       |
| /api/users/                   | PUT, GET  | Yes                      |
| /api/users/unfriend/:friendId | POST      | Yes                      |
| /api/requests/send            | POST      | Yes                      |
| /api/requests/respond         | POST      | Yes                      |
| /api/messages/:receiverId     | POST, GET | Yes                      |

Authentication token is obtained after registration with a POST to `/api/users`, or doing a login with a POST to `/api/users/login`. This token has to be set in the `x-access-token` header of all other requests. The token expires after 5 hours of being generated.
