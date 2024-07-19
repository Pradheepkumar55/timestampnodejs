import express from "express";
import cors from "cors";
import fs from "fs";
import {format} from 'date-fns';


const app = express();
app.use(cors())
const PORT =5000;


app.post('/createfile' , (req, res) =>{
    let today= format(new Date(),"dd-mm-yyyy-hh-mm-ss")
    const path = `todaytimestamp/${today}.txt`
    fs.writeFileSync(path,`${today}`,'utf-8')
    let data = fs.readFileSync(path,'utf-8')
try {
    res.status(200).send(data)
} catch (error) {
    res.status(400).send(err)
}

})

app.get('/getdetails', (req, res) => {
    fs.readdir('todaytimestamp',(err ,files) =>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).send(files)
        }
    })
    
    
})

app.listen(PORT,() =>{
    console.log(`Server is running at ${PORT}`)
})