var fs = require("fs")

fs.readFile("input_countries.csv", (err, data) => {
    if(err){
        console.log(err)
        return
    }
    console.log(data.toString())
})