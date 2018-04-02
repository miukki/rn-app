import Expo from 'expo'
import { fromJS } from 'immutable'
import * as types from './types'
import { selectItem } from './actions'
import { changeWordsList } from '../studyPlan/actions'

const initialState = fromJS({
  items: []
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_ITEM:
      return state.set(
        'items',
        state.get('items').map((item, index) => {
          let newItem = item.set('selected', action.index === index)
          return newItem
        })
      )
    default:
      return state
  }
}
