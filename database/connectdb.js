import mongoose from "mongoose"; 

try{
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Database connected")
}
catch(error){
    console.log("Error connection to database" + error)
}

