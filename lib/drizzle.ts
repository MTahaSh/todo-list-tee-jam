import {
    pgTable,
    serial,
    text,
    varchar,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core"
import { sql } from "@vercel/postgres";

import { drizzle } from "drizzle-orm/vercel-postgres";
import {InferModel} from "drizzle-orm"

export const todoTable = pgTable("todo",{
    id: serial("id").primaryKey(),
    title: varchar("title", {length:255}),
    task: varchar("task",{length:255}),
})


export type Todo = InferModel<typeof todoTable>
export type NewTodo = InferModel<typeof todoTable, "insert">


export const db = drizzle(sql);