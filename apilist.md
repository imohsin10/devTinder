
## authRouter 
-POST/signup
-POST/login
-POST/logout

## profileRouter
-PATCH/profile/edit
-PATCH/profile/password
-GET/profile/view

## connectionRequestRouter
-POST/send/request/interested/:userId
-POST/send/request/ignored/:userId
-POST/send/request/accepted/:requestId
-POST/send/request/rejecteded/:requestId


## userRouter
GET/user/connection
GET/user/request/received
GET/user/feed  get the profile of others user on platform
DELETE/profile