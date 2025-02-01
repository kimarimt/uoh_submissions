import express, { Express, Request, Response } from 'express'
import { type CalculatorValues } from './helpers/util'
import { calculateBMI } from './helpers/bmi'

const PORT = 3003

const app: Express = express()
app.use(express.json())

app.get('/bmi', (req: Request, res: Response) => {
  const { weight, height } = req.query 
  const parsedWeight = Number(weight)
  const parsedHeight = Number(height)

  if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
    res.json({ 'error': 'malformed parameters' })
    return
  }

  const values: CalculatorValues = {
    height: parsedHeight,
    weight: parsedWeight
  }

  const result = calculateBMI(values)

  res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi: result
  })
})

app.listen(PORT, () => {
  console.log(`[server] server is listening at http://localhost:${PORT}`)
})