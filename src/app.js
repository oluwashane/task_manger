const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send({
//       message: "GET requests are disabled"
//     })
//   } else {
//     next()
//   }
// })

// Maintance mode
// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down check back soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app