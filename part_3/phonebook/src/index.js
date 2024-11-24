import config from './utils/config.js'
import app from './app.js'

app.listen(config.PORT, () => {
  console.log(`[server]: listening at http://localhost:${config.PORT}`)
})
