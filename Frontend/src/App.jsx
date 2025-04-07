
// import './App.css'
import React, { useState ,useEffect } from "react"


import toast, { Toaster } from "react-hot-toast"; 
import Header from "./Header"
import Footer from "./Footer"
import Create from "./Create"
import Note from "./Note"

function App() {
  const [data,setData]=useState([])
  async function fetchData() {
    let dbData= await fetch("http://127.0.0.1:3000")
    dbData= await dbData.json()
    
    setData(dbData)
  }

useEffect(()=>{
  fetchData()
},[])

  
  async function handleClick(event,note){    
    event.preventDefault()
    let responce=await fetch("http://127.0.0.1:3000",{
      method:"post",
      headers:{
        'Content-Type':'application/json'
    },
     body:JSON.stringify(note)
    })
    responce=await responce.json()
    if (responce.state) {
      toast.error(responce.error);
      //navigate
    } else {
      toast.success(responce.message);
    }
    
    fetchData()
  }
  async function handleDelete(id){
   
    await fetch("http://127.0.0.1:3000/"+id,{
      method:"delete"
    }) 
    fetchData()
  }

  return (
    <>
    <Header/>
    <Create click={handleClick}/>
    {
      data.map((oneNote,index)=>{
        return (<Note key={index} id={oneNote._id} title={oneNote.title} content={oneNote.content} del={handleDelete}/>)
      })
    }
    
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
