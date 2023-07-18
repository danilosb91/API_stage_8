module.exports = {
    jwt:{
        secret: process.env.AUTO_SECRET || "default",
        expiresIn:"1d"
    }
    


}