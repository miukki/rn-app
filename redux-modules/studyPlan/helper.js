import models from 'eic-vocab-app-models'

// helper functions
export const getWordsListUid = ({ wordsListUid, wordsLists }) => {
  if (!wordsLists || !wordsLists.size) {
    return null
  }
  return wordsListUid && wordsListUid !== ''
    ? wordsListUid
    : Array.from(wordsLists.keys())[0] // get first by default if no wordsListUid
}

export const getWordsList = ({ wordsListUid, wordsLists }) => {
  if (!wordsLists || !wordsLists.size) {
    return null
  }
  wordsListUid = getWordsListUid({ wordsListUid, wordsLists })
  return Array.from(wordsLists.get(wordsListUid))
}

export const getOpts = ({ learnedWords, wordsList }) => {
  if (!wordsList) {
    return null
  }
  const wordsAmount = models.StudyPlan.getWordsAmount(
    wordsList,
    Array.from(learnedWords)
  )
  return models.StudyPlan.getOpts(wordsAmount)
}
