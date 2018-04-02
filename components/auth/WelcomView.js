// @flow
import React from 'react'
import { View, Button, Text, H1 } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../containers/Login/styles'

const WelcomView = ({ ...props }) => (
  <View>
    <View style={{ flex: 1 }}>
      <H1 style={{ textAlign: 'center' }}>IELTS Vocab PowerUp</H1>
      <Text style={{ textAlign: 'center' }}>
        Strengthens your IELTS vocabulary
      </Text>
    </View>
    <View style={styles.buttonGroup}>
      <Button block onPress={props.onShowSignUp}>
        <Text>Create an account</Text>
      </Button>
      <Button
        block
        bordered
        style={styles.buttonSpacer}
        onPress={props.onShowSignIn}
      >
        <Text>Login</Text>
      </Button>
    </View>
  </View>
)

WelcomView.propTypes = {
  onForgotPasswordChangeMobile: PropTypes.func
}

WelcomView.displayName = 'WelcomView'

export default WelcomView
