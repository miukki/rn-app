import Expo from 'expo'

export default class Storage {
  static getJWT() {
    return Expo.SecureStore.getItemAsync('jwt')
  }

  static setJWT(jwt) {
    return Expo.SecureStore.setItemAsync('jwt', jwt)
  }

  static deleteJWT() {
    return Expo.SecureStore.deleteItemAsync('jwt')
  }

  static getStudyPlan() {
    return Expo.SecureStore.getItemAsync('studyPlan').then(results => {
      if (!results) {
        return false // return false when data never save
      }

      let {
        learnedWords,
        checkinLogs,
        wordsListUid,
        dailyWordsAmount
      } = JSON.parse(results)

      return { learnedWords, checkinLogs, wordsListUid, dailyWordsAmount }
    })
  }

  static saveStudyPlan({
    learnedWords,
    checkinLogs,
    wordsListUid,
    dailyWordsAmount
  }) {
    return Expo.SecureStore.setItemAsync(
      'studyPlan',
      JSON.stringify({
        learnedWords: Array.from(learnedWords),
        checkinLogs: Array.from(checkinLogs),
        wordsListUid,
        dailyWordsAmount
      })
    )
  }
}
