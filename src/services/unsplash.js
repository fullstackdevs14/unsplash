import Unsplash, { toJson } from 'unsplash-js/native'
import config from '../config'

export const unsplash = new Unsplash({
  applicationId: config.unsplashApplicationId,
  secret: config.unsplashSecret,
})

