/* eslint-disable no-console */
import { httpServer, server } from 'src/server'

const PORT = server.get('port')

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
