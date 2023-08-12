import {NextResponse, NextRequest} from "next/server";
// import {db} from '@vercel/postgres'
import {db,todoTable,Todo,NewTodo} from "@/lib/drizzle"
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";


export async function GET () {
   

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