import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/StickyNotes").then(()=>{
    console.log("DB connected successfully")
}).catch(()=>{
    console.log("couldnt connect to database")
})

const noteSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    },{
        versionKey:false
    }
)

const Note=mongoose.model("Note",noteSchema)

app.get("/",async(req,res)=>{
    try{
        const data=await Note.find({})
        res.status(200).json(data)

    }catch(error){
        res.status(500).json({error:"error fetching data"})
        console.log(error);
    }
})

app.post("/",async(req,res)=>{
    try{
        await Note.create(req.body)
        res.status(200).json({message:"successfully posted note" ,state:false})

    }catch(error){
        res.status(500).json({error:"error posting data",state:true})
        console.log(error);
    }
})

app.delete("/:id",async(req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"successfully deleated data"})

    }catch(error){
        res.status(500).json({error:"error deleating data"})
        console.log(error);
    }
})

app.listen(3000,()=>{
    console.log("http://127.0.0.1:3000")
})