const express = require('express')
const router = express.Router()
const User = require('../models/user')
const UserRequest = require('../models/connectionRequest')
const { userAuth } = require('../../middleware/auth')


router.get('/user/request/received', userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;
        const userRequest = await UserRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'

        }).populate('fromUserId', 'firstName lastName photoUrl')
        res.status(200).json({
            message: "Data fetched succesfully",
            userRequest
        })
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }




})
router.get('/user/connections', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const connectionRequest = await UserRequest.find({
            $or: [
                { toUserId: loggedInUser, status: 'accepted' },
                { fromUserId: loggedInUser, status: 'accepted' }
            ]
        })
        if (!connectionRequest) {
            return res.status(200).json({
                message: "You dont have any connection",

            })
        }
        res.status(200).json({
            message: "Data fetched succesfully",
            connectionRequest
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

router.get('/feed', userAuth, async (req, res) => {
    try {

        const connectionRequest=await userRequest.find({
            $or: [
                { toUserId: loggedInUser, },
                { fromUserId: loggedInUser, }
            ]
        })

        console.log(connectionRequest)


    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})
module.exports = router;


