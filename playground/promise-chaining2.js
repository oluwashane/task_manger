require('../src/db/mongoose');
const Task = require('../src/modules/task');

// Task.findByIdAndDelete('5d419c0de905222a640e889a').then((task) => {
//   console.log(task);
//   return Task.countDocuments({
//     completed: false
//   })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteDocs = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const delDocs = await Task.countDocuments({
    completed: false
  })
  return delDocs;
}

deleteDocs('5d419bdb33ba8c0254c2642c').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e);
})