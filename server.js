const app = require('./app')
const { server, PORT } = require('./handlers/handlers')

//Server start.
app.listen(PORT, server)