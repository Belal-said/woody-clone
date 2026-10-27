import postgres from "postgres";
import "./env.js";

// prepare: false is required when connecting through Supabase's transaction pooler.
const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function testConnection() {
    try {
        const result = await sql`SELECT NOW()`;

        console.log("✅ Database connected successfully!");
        console.log("Database time:", result[0].now);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
}

testConnection();

export default sql;
