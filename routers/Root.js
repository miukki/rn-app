import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import Login from '../containers/Login'
import Tab from './Tab'
import Practice from '../containers/Practice'
import FlipCards from '../containers/FlipCards'

export const Navigator = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login'
      }
    },
    Tab: {
      screen: Tab,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    },
    Practice: {
      screen: Practice,
      navigationOptions: {
        headerTitle: 'Practice'
      }
    },
    FlipCards: {
      screen: FlipCards,
      navigationOptions: {
        headerTitle: 'FlipCards'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
)

const initialState = Immutable.fromJS(
  Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams('Login')
  )
)

export const reducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state.toJS())

  // Simply return the original `state` if `nextState` is null or undefined.
  return state.merge(nextState)
}

const Nav = props => (
  <Navigator
    navigation={addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.nav
    })}
  />
)

Nav.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object
}

const mapStateToProps = state => ({
  nav: state.get('rootNav').toJS()
})

export default connect(mapStateToProps)(Nav)
