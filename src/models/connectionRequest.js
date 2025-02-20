const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["accepted", "rejected", "ignored", "interested"],
            message: `{value} is incorrect status type`
        },
    },

},
    {
        timestamps: true,
    }
)

connectionRequestSchema.index({fromUserId:1,toUserId:1})
connectionRequestSchema.pre('save', function (next) { 
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error(":can't send connection request to yourself")
    }
  
    next() 
});
module.exports = mongoose.model("connectionRequest", connectionRequestSchema)