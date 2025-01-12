import app from './app.js'
import { port } from './utils/config.js'

app.listen(port, () => {
  console.log(`[server]: Listening at http://localhost:${port}`)
})
