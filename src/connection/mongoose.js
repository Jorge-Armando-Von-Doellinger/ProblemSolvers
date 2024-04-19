const mongoose = require("mongoose")


    mongoose.connect("mongodb://localhost/problemsolvers")
    .then(() => {
        console.log("Conectado ao mongoose")
    })
    .catch((err) => {
        console.log("Erro ao se conectar com o mongoose!")
    })
