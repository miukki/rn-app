import { changeWordsList } from '../studyPlan/actions'
import { NavigationActions } from 'react-navigation'

export const selectItems = state => {
  const wordsLists = state.studyPlan.wordsLists
  const learnedWords = state.studyPlan.learnedWords

  return [...wordsLists.entries()].map((list, index) => {
    const wordsListUid = list[0]
    const wordsList = [...list[1]]
    const progress =
      wordsList.filter(w => [...learnedWords].indexOf(w.wordStr) !== -1)
        .length /
      wordsList.length *
      100

    return {
      title: list[0],
      onPress: () => {
        window.store.dispatch(changeWordsList(index))
        window.store.dispatch(
          NavigationActions.back({
            key: window.store.getState().toJS().homeNav.routes[1].key
          })
        )
      },
      progress
    }
  })
}
