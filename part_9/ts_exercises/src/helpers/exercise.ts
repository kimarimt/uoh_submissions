export enum Rating {
  Bad = 1,
  Average,
  Excellent,
}

interface RatingDescription {
  rating: Rating
  description: string
}

const RATING_DESCRIPTIONS: RatingDescription[] = [
  {
    rating: Rating.Bad,
    description: "Not the best week but you're making progress",
  },
  { rating: Rating.Average, description: 'An okay week, keep pushing' },
  { rating: Rating.Excellent, description: 'Really good week, keep it up' },
]

export const getRating = (period: number, daysTrained: number): RatingDescription => {
  const trainingRatio = daysTrained / period

  if (trainingRatio > 0.8) {
    return RATING_DESCRIPTIONS[2]
  } else if (trainingRatio > 0.5) {
    return RATING_DESCRIPTIONS[1]
  } else {
    return RATING_DESCRIPTIONS[0]
  }
}