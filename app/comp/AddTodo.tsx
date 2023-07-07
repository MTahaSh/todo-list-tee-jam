"use client"
import { useState } from 'react'
import Image from 'next/image'
import React from 'react'
import { NewTodo } from '@/lib/drizzle'
import {useRouter} from "next/navigation"

const AddTodo = () => {

    const [task, setTask] = useState<NewTodo>(
        {
            task:"",
        }
    
    )

    const [title, setTitle] = useState<NewTodo>(
        {
            title:"",
        }
    )


    const {refresh} = useRouter();

    const handleSubmit = async() => {
        try {
            if(task)
            {
            const res = await fetch("/api/todo", {
                method:"POST",
                body: JSON.stringify({
                    title: title.title,
                    task: task.task,
                })  
            })
    
            console.log(!res.ok)
            refresh();
        }
        } catch (error) {
            console.log("error");
            
        }
    }

  return (
    <div>
        <form className='w-full '>
            <div className='space-y-3 gap-x-4'>
            <input placeholder='Title' onChange={(e)=> setTitle({title: e.target.value})} className='rounded-full w-full py-3 px-5 border focus:outline-primary' type="text" />
            <input placeholder='Task' onChange={(e)=> setTask({task: e.target.value})} className='rounded-full max-w-xs w-full py-3 px-5 border focus:outline-primary' type="text" />
            <button type='button' onClick={handleSubmit} className='bg-gradient-to-b from-primary to-secondary ml-4 p-4 rounded-full shrink-0'>
                <Image src={"/send.png"} width={20} height={20} alt='/'/>
            </button>
            </div>


        </form>


    </div>
  )
}

export default AddTodo