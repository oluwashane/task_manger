const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN
})


const sendWelcomeEmail = (email, name) => {
  mailgun.messages().send({
    from: 'admin@zaro.io',
    to: email,
    subject: 'Thanks for joining!!!',
    text: `welcome to the app, ${name}. Let me know how you get along with the app.`,
  })
}

const sendGoodByeMail = (email, name) => {
  mailgun.messages().send({
    from: 'admin@zaro.io',
    to: email,
    subject: 'Sorry to see you go',
    text: `Good bye, ${name}. We hope to see you sometime soon.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendGoodByeMail
}