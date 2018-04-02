import models from 'eic-vocab-app-models'
import { getWordsListUid, getWordsList, getOpts } from './helper'

const getOptsFromState = s =>
  getOpts({
    learnedWords: s.toJS().learnedWords,
    wordsList: selectWordsList(s)
  })

export const selectWordsList = state => getWordsList(state.toJS())

// picker choices data

export const selectDailyWordsAmounts = state =>
  Array.from(getOptsFromState(state).keys())

export const selectDaysAmounts = state =>
  getOptsFromState(state)
    ? Array.from(new Set(getOptsFromState(state).values()).add(1))
    : []

// picker selected value

export const selectPickerDailyWordsAmount = state =>
  state.toJS().picker.dailyWordsAmount

export const selectPickerDaysAmount = state => {
  const opts = getOptsFromState(state)
  const dailyWordsAmount = selectPickerDailyWordsAmount(state)
  if (!opts) {
    return NaN
  }
  return models.StudyPlan.getDaysAmount(
    getOptsFromState(state),
    dailyWordsAmount
  )
}

// panel info

export const selectDailyWordsAmount = state => state.toJS().dailyWordsAmount

export const selectWordsListUid = state => getWordsListUid(state.toJS())

export const selectLearnedWords = state =>
  state.toJS().learnedWords ? Array.from(state.toJS().learnedWords) : []

export const selectLearnedWordsInWordsList = state => {
  const wordsList = getWordsList(state.toJS())
  return selectLearnedWords(state).filter(w => {
    return (
      Array.from(wordsList)
        .map(w => w.wordStr)
        .indexOf(w) !== -1
    )
  })
}

export const selectCheckinLogs = state =>
  state.toJS().checkinLogs ? Array.from(state.toJS().checkinLogs) : []

export const selectWordsListAmount = state => {
  const wordsList = getWordsList(state.toJS())
  if (!wordsList) {
    return 0
  }
  return wordsList.length
}

export const selectDaysLeft = state => {
  const opts = getOptsFromState(state)
  const dailyWordsAmount = selectPickerDailyWordsAmount(state)
  if (!opts) {
    return NaN
  }
  const daysLeft = models.StudyPlan.getDaysAmount(
    getOptsFromState(state),
    dailyWordsAmount
  )
  return daysLeft ? daysLeft : 1
}

export const selectShowDaysPicker = state => state.toJS().showDaysPicker

export const selectLearnedWordsByUser = state => {
  const learnedWords = selectLearnedWordsInWordsList(state)
  return selectWordsListSelectedByUser(state).filter(word => {
    return learnedWords.indexOf(word.wordStr) !== -1
  })
}

export const selectWordsListSelectedByUser = state => {
  return getWordsList(state.toJS())
}

export const selecteDailyGoalComplete = state =>
  Array.from(selectCheckinLogs(state)).indexOf(
    new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '')
  ) !== -1

export const selectWordsListComplete = state =>
  selectLearnedWordsInWordsList(state).length === selectWordsListAmount(state)
