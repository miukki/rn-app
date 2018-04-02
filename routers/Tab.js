import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import HomeNav from './HomeNav'
import Review from '../containers/Review'
import Settings from '../containers/Settings'

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => <Icon name="home" />
  }

  render() {
    return <HomeNav />
  }
}

class ReviewScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Review',
    tabBarIcon: () => <Icon name="repeat" />
  }

  render() {
    return <Review />
  }
}

class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: () => <Icon name="settings" />
  }

  render() {
    return <Settings />
  }
}

export const Navigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: false
      }
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: {
        title: 'Review'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings'
      }
    }
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    animationEnabled: true
  }
)

const initialState = Immutable.fromJS(
  Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams('Home')
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
  nav: state.get('tabNav').toJS()
})

export default connect(mapStateToProps)(Nav)
