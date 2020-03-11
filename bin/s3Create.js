const s3Create = require('../lib/s3Create')

const file = process.argv[2]
s3Create(file)
  .then(console.log)
  .catch(console.error)
