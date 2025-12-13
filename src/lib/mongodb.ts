import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI")
}

let cached = (global as any).mongoose

if (!cached) {``
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    console.log("[MongoDB] reuse connection:", cached.conn.connection.name)
    return cached.conn
  }

  if (!cached.promise) {
    console.log("[MongoDB] connecting to:", MONGODB_URI.replace(/\/\/.*@/, "//****@"))

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "landstock_valuation_uat",
      })
      .then((m) => {
        console.log("[MongoDB] connected")
        console.log("  DB name:", m.connection.name)
        console.log("  Host:", m.connection.host)
        console.log("  User:", m.connection.user)
        return m
      })
      .catch((err) => {
        console.error("[MongoDB] connection error:", err.message)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
