import { fromJS } from 'immutable'
import Expo from 'expo' // eslint-disable-line
import models from 'eic-vocab-app-models'
import * as types from './types'
import appConfig from '../../config'

const initialState = fromJS({
  items: [],
  warning: 'No Learned Words',
  planAmount: 0,
  remain: 0
})

const amountWord = appConfig.amountFlipCards

const generateWords = learnedWordsByUser => {
  return models.Review.getCards(learnedWordsByUser, amountWord)
}
let prevArray

const review = (state = initialState, action) => {
  switch (action.type) {
    case types.RENDER_EMPTY:
      return state.set('items', []).set('remain', 0)
    case types.RENDER_START:
      prevArray = generateWords(action.payload.learnedWordsByUser)
      return state
        .set('items', prevArray)
        .set('planAmount', prevArray.length)
        .set('remain', prevArray.length)
    case types.RENDER_RELOAD:
      return state
        .set('items', prevArray)
        .set('planAmount', prevArray.length)
        .set('remain', prevArray.length)
    case types.UPDATE_REMAIN_AMOUNT:
      return state.set('remain', state.get('remain') - 1)
    default:
      return state
  }
}

export default review
