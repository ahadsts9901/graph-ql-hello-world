import express, { json } from "express"
import morgan from "morgan"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"

import routes from "./routes/main.mjs"
import { server } from "./graphql.mjs"

const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)

app.use(json())
app.use(morgan('dev'))

await server.start()

app.use('/api/v1', expressMiddleware(server), routes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on post ${PORT}`))