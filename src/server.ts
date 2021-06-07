import express,{Application,Request,Response} from "express";

const app:Application=express();

const port = 3001;

app.get("/",(req:Request,res:Response):void=>{
res.send("Writing to Page");

})

app.listen(port,()=>{
    console.log(`Running on port: ${port}`);
})
