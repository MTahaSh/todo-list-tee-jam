import React from 'react'
import { Todo } from '@/lib/drizzle'
import DeleteTodo from './DeleteTodo';

const  getData = async() => {
    const res = await fetch("http://127.0.0.1:3000/api/todo",
    {
        method:"GET",
        cache:"no-store",
        headers:{
            "content-type": "application/json"
        }
    });

    try {
        if(!res.ok)
    {
        throw new Error("Failed to fetch the data!!")
    }   

    return res.json();

    } catch (error) {
        console.log("Issue: "+ error);
        
    }
    
}


export const TodoList = async() => {
  
    const res: {data:Todo[]} = await getData();

    console.log("Fetched data:" + res.data);
    

    return (

        <div className='max-h-[400px] overflow-auto mb-4 scrollbar-thumb-primary scrollbar-track-transparent  scrollbar-thin scrollbar-thumb-rounded'>
    
        {res.data.map((item)=>(
            

            <div className='bg-gray-100 py-2 px-4 flex items-center gap-x-5 shadow rounded-lg my-3 justify-between'>
        
        <div className='flex gap-x-5'>
        <div className='h-3 w-3 bg-secondary self-center  rounded-full'></div>
        <div>
        <h1 className='font-bold text-md'>{item.title}</h1>
        <p className='text-md font-sm'>{item.task}</p>
        </div>

        </div>
        <div>
            
        <DeleteTodo id={item.id}/>
        </div>
    </div>

        ))}
    
        </div>
        
  )
}
