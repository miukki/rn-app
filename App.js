import Expo from 'expo'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Root } from 'native-base'
import { NavigationActions } from 'react-navigation'

import Storage from './lib/Storage'
import configureStore from './store/configure-store'
import RootNav from './routers/Root'

import * as tokenActions from './redux-modules/auth/token/actions'

const store = configureStore()
window.store = store

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    })

    window.Expo = Expo
    window.Storage = Storage

    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT)

    // load jwt and go to home panel
    window.Storage.getJWT().then(jwt => {
      if (jwt) {
        window.store.dispatch(tokenActions.setJWT(jwt))
        window.store.dispatch(NavigationActions.navigate({ routeName: 'Tab' }))
      }
    })

    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

    return (
      <Provider store={store}>
        <Root>
          <RootNav />
        </Root>
      </Provider>
    )
  }
}
