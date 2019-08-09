const mongoose = require('../src/db/mongoose');
const User = require('../src/modules/user');



// 5d41859cb9a3db12d011eb57

// User.findByIdAndUpdate('5d41847e09dd1223048185cc', {
//   age: 1
// }).then((user) => {
//   console.log(user)
//   return User.countDocuments({
//     age: 1
//   })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age
  })
  const count = await User.countDocuments({
    age
  })
  return count
}

updateAgeAndCount('5d41847e09dd1223048185cc', 20).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e);
})