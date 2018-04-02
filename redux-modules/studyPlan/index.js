import Expo from 'expo'
import { fromJS } from 'immutable'

import { types as logicTypes } from 'eic-vocab-app-redux-logic'
import appLogicTypes from './types'
import wordsLists from '../../data/words_lists'

const initialState = fromJS({
  wordsLists,
  wordsListUid: '',
  learnedWords: new Set(),
  checkinLogs: new Set(),
  dailyWordsAmount: 15,
  picker: { dailyWordsAmount: 15 }
})

export default (state = initialState, action) => {
  switch (action.type) {
    case appLogicTypes.LOAD_SAVED_DATA_DONE:
      // TODO: fix if saved data lack
      const newData = { ...state.toJS(), ...action.payload }
      let {
        learnedWords,
        checkinLogs,
        dailyWordsAmount,
        wordsListUid
      } = newData
      return state
        .set('wordsListUid', wordsListUid)
        .set('learnedWords', fromJS(new Set(learnedWords)))
        .set('checkinLogs', fromJS(new Set(checkinLogs)))
        .set('dailyWordsAmount', dailyWordsAmount)
        .set('picker', fromJS({ dailyWordsAmount }))

    // modify user data
    case appLogicTypes.UPDATE_USER_DATA:
      return state
        .set('dailyWordsAmount', action.payload.dailyWordsAmount)
        .set('wordsListUid', action.payload.wordsListUid)
        .set('learnedWords', action.payload.learnedWords)
        .set('checkinLogs', action.payload.checkinLogs)

    // picker
    case appLogicTypes.UPDATE_PICKER_DAILY_WORDS_AMOUNT:
      return state.set(
        'picker',
        state
          .get('picker')
          .set('dailyWordsAmount', action.payload.dailyWordsAmount)
      )

    case appLogicTypes.UPDATE_PICKER_DAYS_AMOUNT:
      return state.set(
        'picker',
        state.get('picker').set('daysAmount', action.payload.daysAmount)
      )

    // control ui
    case appLogicTypes.SHOW_PICKER:
      return state.set('showDaysPicker', true)

    case appLogicTypes.CONFIRM_PICKER:
      return state.set('showDaysPicker', false)

    case appLogicTypes.HIDE_PICKER:
      return state.set('showDaysPicker', false)

    default:
      return state
  }
}
