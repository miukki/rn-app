import reducer from './index'
import * as types from './types'

describe('FlipCards reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle action.type RENDER_EMPTY', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.RENDER_EMPTY
      }).toJS()
    ).toMatchSnapshot()
  })
})
