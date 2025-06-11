## authRouter 
-POST /signup
-POST /login
-POST /logout

## profileRouter
-PATCH /profile/edit
-PATCH /profile/password
-GET /profile/view

## connectionRequestRouter
-POST /request/send/:status/:userId
-POST /request/review/:status/:userId



## userRouter
GET /user/connection
GET /user/request/received
GET /user/feed  get the profile of others user on platform
DELETE /profile