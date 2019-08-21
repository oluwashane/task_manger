const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Mark',
      email: 'shane@example.com',
      password: 'jamesmark'
    })
    .expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about response body
  expect(response.body).toMatchObject({
    user: {
      name: 'Mark'
    },
    token: user.tokens[0].token
  })
  
  expect(user.password).not.toBe('jamesmark')
})

test('Should Login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
    email: userOne.email,
    password: userOne.password
    })
    .expect(200)

    const user = await User.findById(response.body.user._id)

    // Assert that token in response matches users second token
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: 'shane@example.com',
      password: 'mikesmith'
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId)
  // Assert null response 
  expect(user).toBeNull()

})

test('Should not delete account of unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'smith johson',
      password: 'mrjohnson'
    })
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('smith johson')
})

test('should not update invalid user fields', async () => {
  await request(app)
  .patch('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send({
    location: 'abuja'
  })
  .expect(400)
})

