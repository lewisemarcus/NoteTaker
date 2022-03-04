const app = require('./app')
const { server, PORT } = require('./handlers')

//Server start.
app.listen(PORT, server)