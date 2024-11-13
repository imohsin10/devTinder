const mongoose=require('mongoose')
const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://mohsinabbassayyed:KnMgb214pBalJizF@namastenode.ioxpm.mongodb.net/devTinder')
}

module.exports={connectDB}
