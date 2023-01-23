var fs = require("fs")
var csv = require('csv-parser')

const csvfile = "input_countries.csv";
const column = 'country'
const canada = "Canada"
const USA = "United States"

//Deletes the existing file and creates a new one -- Canada txt file
if(fs.existsSync("canada.txt")){
    fs.unlinkSync("canada.txt")
}
fs.writeFileSync("canada.txt", '')

//Deletes the existing file and creates a new one -- USA txt file
if(fs.existsSync("usa.txt")){
    fs.unlinkSync("usa.txt")
}
fs.writeFileSync("usa.txt", '')

//Writes data from csv file into txt file -- Canada txt file
fs.createReadStream(csvfile).pipe(csv()).on('data', (data) =>{
    if(data[column] === canada){
        fs.appendFileSync("canada.txt", JSON.stringify(data)+'\n');
    }
})

//Writes data from csv file into txt file -- USA txt file
fs.createReadStream(csvfile).pipe(csv()).on('data', (data) =>{
    if(data[column] === USA){
        fs.appendFileSync("usa.txt", JSON.stringify(data)+'\n');
    }
})