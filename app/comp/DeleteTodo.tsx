"use client"
import React from 'react'
import {BsFillTrashFill} from "react-icons/bs"
import {useRouter} from "next/navigation"


const DeleteTodo = ({id}:{id:any}) => {
  

    const {refresh} = useRouter();
  const handleDelete = async(id:number)=>{
    try {
        const res = await fetch("/api/todo", {
            method:"DELETE",
            body: JSON.stringify({id})  
        })

        console.log(!res.ok)
        refresh();
    
    } catch (error) {
        console.log("error");
        
    }
  }
  
    return (
    <div>
        <button className='text-xl text-primary' onClick={() => handleDelete(id)}><BsFillTrashFill/></button>
    </div>
  )
}

export default DeleteTodo