import { createLogic } from 'redux-logic'

import models from 'eic-vocab-app-models'
import { types as packageLogicTypes } from 'eic-vocab-app-redux-logic'

import types from './types'
import { getWordsList, getOpts } from './helper'

const loadSavedData = createLogic({
  type: types.LOAD_SAVED_DATA,
  process({ vocabAppServiceJsSdk, Storage, getState, action }, dispatch, done) {
    return vocabAppServiceJsSdk
      .getStudyPlan(getState().toJS().token.jwt)
      .catch(console.log)
      .then(res => {
        console.log('res', res.data)
        return Storage.getStudyPlan()
      })
      .then(results => {
        if (results) {
          dispatch({ type: types.LOAD_SAVED_DATA_DONE, payload: results })
        }
        done()
      })
  }
})

const updateWordsList = createLogic({
  type: types.CHANGE_WORDS_LIST,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_WORDS_LIST
  },
  process({ getState, action }) {
    return {
      wordsListUid: Array.from(
        getState()
          .toJS()
          .studyPlan.wordsLists.keys()
      )[action.payload.index]
    }
  }
})

const updateDailyWordsAmount = createLogic({
  type: types.CONFIRM_PICKER,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_DAILY_WORDS_AMOUNT
  },
  process({ getState, action }) {
    return {
      dailyWordsAmount: getState().toJS().studyPlan.picker.dailyWordsAmount
    }
  }
})

const updateLearnedWords = createLogic({
  type: '@@vocab-app-redux-logic/practice-logic/word-learned', // for now
  // type: types.ADD_LEARNED_WORD,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_LEARNED_WORDS
  },
  process({ getState, action }) {
    return {
      learnedWords: getState()
        .toJS()
        .studyPlan.learnedWords.add(action.wordStr) // for now
      // .studyPlan.learnedWords.add(action.payload.wordStr)
    }
  }
})

const updateCheckinLogs = createLogic({
  type: types.ADD_CHECKIN_LOG,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_CHECKIN_LOGS
  },
  process({ getState, action }) {
    return {
      checkinLogs: getState()
        .toJS()
        .studyPlan.checkinLogs.add(action.payload.checkinLog)
    }
  }
})

const updateUserData = createLogic({
  type: [
    types.UPDATE_WORDS_LIST,
    types.UPDATE_DAILY_WORDS_AMOUNT,
    types.UPDATE_LEARNED_WORDS,
    types.UPDATE_CHECKIN_LOGS
  ],
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_USER_DATA
  },
  process({ getState, action }) {
    let {
      learnedWords,
      checkinLogs,
      wordsListUid,
      dailyWordsAmount
    } = getState().toJS().studyPlan
    return {
      learnedWords,
      checkinLogs,
      wordsListUid,
      dailyWordsAmount,
      ...action.payload
    }
  }
})

const saveData = createLogic({
  type: types.UPDATE_USER_DATA,
  processOptions: {
    dispatchReturn: true,
    successType: types.SAVE_USER_DATA_DONE
  },
  process({ Storage, getState, action }) {
    return Storage.saveStudyPlan(action.payload)
  }
})

const renewPickerDailyWordsAmount = createLogic({
  // We are trying to keep previous value of dailyWordsAmount,
  // so this logic will not run when UPDATE_PICKER_DATA
  // but this may run in `checkOutRangePickerDailyWordsAmount` logic
  type: types.UPDATE_PICKER_DAYS_AMOUNT,
  process({ getState, action }, dispatch, done) {
    const learnedWords = getState().toJS().studyPlan.learnedWords
    const wordsList = getWordsList(getState().toJS().studyPlan)
    const opts = getOpts({
      learnedWords,
      wordsList
    })

    const daysAmount = action.payload.daysAmount

    let dailyWordsAmount = models.StudyPlan.getDailyWordsAmount(
      opts,
      daysAmount
    )

    if (
      models.StudyPlan.getDaysAmount(
        opts,
        getState().toJS().studyPlan.picker.dailyWordsAmount
      ) !== daysAmount
    ) {
      dispatch({
        type: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT,
        payload: { dailyWordsAmount }
      })
    }

    done()
  }
})

const renewPickerDaysAmount = createLogic({
  // We need to renew daysAmount valuse when
  // - picker data updated
  // - dailyWordsAmount changed
  type: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT,
  process({ getState, action }, dispatch, done) {
    const learnedWords = getState().toJS().studyPlan.learnedWords
    const wordsList = getWordsList(getState().toJS().studyPlan)
    const opts = getOpts({
      learnedWords,
      wordsList
    })

    const dailyWordsAmount = action.payload.dailyWordsAmount
    const daysAmount = models.StudyPlan.getDaysAmount(opts, dailyWordsAmount)

    if (getState().toJS().studyPlan.picker.daysAmount !== daysAmount) {
      dispatch({
        type: types.UPDATE_PICKER_DAYS_AMOUNT,
        payload: {
          daysAmount
        }
      })
    }

    done()
  }
})

const addCheckinLog = createLogic({
  type: packageLogicTypes.SHOW_QUESTION,
  process({ getState, action }, dispatch, done) {
    if (action.question === null) {
      dispatch({
        type: types.ADD_CHECKIN_LOG,
        payload: {
          checkinLog: new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '')
        }
      })
    }
    done()
  }
})

export default [
  loadSavedData,
  updateWordsList,
  updateDailyWordsAmount,
  updateLearnedWords,
  updateCheckinLogs,
  updateUserData,
  saveData,
  renewPickerDailyWordsAmount,
  renewPickerDaysAmount,
  addCheckinLog
]
