const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 3000;

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



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});



//const main = async () => {
// const task = await Task.findById('5d4b409c9424b21c14c7da60')
// await task.populate('owner').execPopulate()
// console.log(task.owner)

// const user = await User.findById('5d4b3f4260bcd6047ca594fa')
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)

//}

//main()

const multer = require('multer')

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a word document'))
    }

    cb(undefined, true)
    // cb(new Error('File must be a PDF'))
    // cb(undefined, true)
    // cb(undefined, false)
  }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})