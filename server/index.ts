/* eslint-disable no-console */
import { server } from 'src/server'

const PORT = server.get('port')

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
