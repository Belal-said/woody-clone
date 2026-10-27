import express from "express";
import { supabaseAdmin, supabaseForUser } from "./src/config/supabase.js";
import sql from "./src/config/db.js";

const app = express();
app.use(express.json());

app.get("/", async (request, response) => {
    const result = await sql`SELECT * FROM users WHERE id = 1`;
    response.json(result);
});

app.get("/me/todos", async (request, response) => {
    const accessToken = request.headers.authorization?.replace("Bearer ", "");
    if (!accessToken)
        return response.status(401).json({ error: "Missing token" });
    const { data, error } = await supabaseForUser(accessToken)
        .from("todos")
        .select("*");
    if (error) return response.status(400).json({ error: error.message });
    response.json(data);
});

app.listen(8000, () => console.log("Listening on http://localhost:8000"));
