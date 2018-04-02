import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import Immutable from 'immutable'
import WordSelectionPicker from './'

import wordsLists from '../../data/words_lists'

Enzyme.configure({ adapter: new Adapter() })
const shallow = Enzyme.shallow
jest.mock('../../redux-modules/wordlist/actions')

const mockStore = configureStore([])

describe('WordSelectionPicker container', function() {
  let component

  beforeAll(() => {
    const testState = Immutable.fromJS({
      studyPlan: {
        wordsLists,
        learnedWords: []
      }
    })
    const store = mockStore(testState)
    component = shallow(<WordSelectionPicker />, { context: { store } })
  })

  it('should map state to props', () => {
    expect(component.props().items).toMatchSnapshot()
  })
})
