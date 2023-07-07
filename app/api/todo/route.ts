import {NextResponse, NextRequest} from "next/server";
// import {db} from '@vercel/postgres'
import {db,todoTable,Todo,NewTodo} from "@/lib/drizzle"
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

export async function GET (request: NextRequest) {
   

    try {
        await sql`CREATE TABLE IF NOT EXISTS todo(id SERIAL,title varchar(255),task varchar(255));`
       const res = await db.select().from(todoTable).execute();
        // console.log(res);
        return NextResponse.json({data:res})
    } catch (error) {
        console.log((error as {message:string}).message);
        
        return  NextResponse.json({message:"Something went wrong!"})
    }



    return NextResponse.json({Message:"Hello there Taha"})
}

export async function POST(request: NextRequest)
{
   
    const req = await request.json();

    try {
        if(req.task || req.title)
        {
            // const res = await sql`INSERT INTO todo(title,task) VALUES(${req.title}, ${req.task})`
            const res = await db.insert(todoTable).values({
                title: req.title,
                task: req.task
            }).returning();


            console.log(res);
            
            return NextResponse.json({message:"Data has been inserted!!"})
        }
        else{
            throw new Error("Task is required!")
        }

    } catch (error) {
        return NextResponse.json({message:(error as {message:string}).message})
    }
}


export async function DELETE (request:NextRequest)
{
    const req = await request.json();

    try {
        if(req.id)
        {
            // const res = await sql`INSERT INTO todo(title,task) VALUES(${req.title}, ${req.task})`
            const res = await db.delete(todoTable).where(eq(todoTable.id,req.id));


            console.log(res);
            
            return NextResponse.json({message:"Data has been inserted!!"})
        }
        else{
            throw new Error("Task is required!")
        }

    } catch (error) {
        return NextResponse.json({message:(error as {message:string}).message})
    }

}