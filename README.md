# User-JWT-Post Backend | [DEMO](https://api-jwtposts.onrender.com/api/v1/users/)
Backend for assignment at Varlyq Tech, implements total JWT-secured users and posting system with comments and like support.

### Features include:
- User registration and login system
- Full token-based authentication with strict user permissions
- Post content
- Comment and like user's comments
- Keep track of refresh tokens and allow only one active token at a time
- Invalidate access tokens after a user has logged out

_Most of the features and code is geared towards security and token storage. Can act as a reference for future jwt-based projects._

## Demo

The api is hosted on [Render](https://render.com/).

**Render Link**: [_Try it out_](https://api-jwtposts.onrender.com/api/v1/users/)

**Postman Collections**: [_Explore_](https://www.postman.com/ananyo141/workspace/varlyq/request/26692677-cbeedc6d-97ae-4fbb-bd1d-1706fcca32ef)

**Github**: [_Link_](https://github.com/ananyo141/jwt-posts-api)

**NOTE**: Since the web service is hosted on _free tier_, it can take upto **a minute** for the first request to be fulfilled.

## API Reference
_For full API documentation, refer to [POSTMAN Collection](https://www.postman.com/ananyo141/workspace/varlyq/request/26692677-55ff9301-05fc-40bc-8e1f-f2329ce7d596)._

Few of the available apis are listed below:

#### Get all users

```
  GET /api/v1/users/
```

#### Create a post

```
  POST /api/v1/posts/
```

| Authorization | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Bearer Token` | **Required**. Access token for logged in user |

#### Add a comment

```
  POST /api/v1/posts/:postId/comments/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `postId`      | `string` | **Required**. Post to add comment to |

#### Like a comment

```
  GET /api/v1/posts/:postId/comments/:commentId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `commentId`      | `string` | **Required**. Id of the liked comment |
| `accessToken`      | `Bearer Token` | **Required**. User who likes the comment |

## Deployment

This project uses yarn for package management.

Install yarn and run:
```bash
  yarn && yarn start
```
This will start the application and the server will listen for requests on default http **PORT 3000**.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, also stated in the .env.example file in the repository.

`PORT` for running in host machine.

`MONGO_URI` url for the connected mongodb.

`JWT_ACCESS_SECRET` secret for access token cryptographic signing 

`JWT_REFRESH_SECRET` secret for refresh token cryptographic signing

`JWT_ACCESS_TIME` time after which access token is invalidated

`JWT_REFRESH_TIME` time after which refresh token is invalidated
