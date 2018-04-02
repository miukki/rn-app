import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'native-base'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import StudyPlan from '../containers/StudyPlan'
import WordsListPicker from '../containers/WordListPicker'

export const Navigator = StackNavigator({
  StudyPlan: {
    screen: StudyPlan,
    navigationOptions: {
      headerTitle: 'StudyPlan'
    }
  },
  SelectWordsList: {
    screen: WordsListPicker,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'StudyPlan',
      headerLeft: (
        <Button
          transparent
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Icon name="arrow-back" />
        </Button>
      )
    })
  }
})

const initialState = Immutable.fromJS(
  Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams('StudyPlan')
  )
)

export const reducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state.toJS())

  // Simply return the original `state` if `nextState` is null or undefined.
  return state.merge(nextState)
}

class Nav extends React.Component {
  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    )
  }
}

Nav.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object
}

const mapStateToProps = state => ({
  nav: state.get('homeNav').toJS()
})

export default connect(mapStateToProps)(Nav)
