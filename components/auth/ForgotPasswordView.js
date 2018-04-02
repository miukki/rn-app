// @flow
import React from 'react'
import { View, Button, Text, Icon, Item, Input, Form } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../containers/Login/styles'
import ModalView from './ModalView'

const ForgotPasswordView = ({ ...props }) => (
  <View>
    <Form>
      <Item regular>
        <Input
          keyboardType="numeric"
          placeholder="Mobile Number"
          disabled={props.forgotPasswordSubmitting}
          value={props.forgotPasswordMobile}
          onChangeText={props.onForgotPasswordChangeMobile}
        />
        <Button
          small
          style={{ marginTop: 8, marginRight: 8 }}
          onPress={() =>
            props.onForgotPasswordSendVcode(props.forgotPasswordMobile)
          }
          disabled={
            props.forgotPasswordVcodeSending ||
            props.forgotPasswordVcodeCountdown > 0
          }
          warning={
            !props.forgotPasswordVcodeSending &&
            props.forgotPasswordVcodeCountdown === 0
          }
        >
          {props.forgotPasswordVcodeSent ? (
            <Text>
              Send Again{' '}
              {props.forgotPasswordVcodeCountdown !== 0
                ? `(${props.forgotPasswordVcodeCountdown})`
                : null}
            </Text>
          ) : (
            <Text>Send Code</Text>
          )}
        </Button>
      </Item>
      <Item regular>
        <Input
          keyboardType="numeric"
          placeholder="Verification Code"
          disabled={props.forgotPasswordSubmitting}
          value={props.forgotPasswordVcode}
          onChangeText={props.onForgotPasswordChangeVcode}
        />
      </Item>
      <Item regular>
        <Input
          placeholder="Password"
          disabled={props.forgotPasswordSubmitting}
          value={props.forgotPasswordPassword}
          secureTextEntry={!props.forgotPasswordShowPassword}
          onChangeText={props.onForgotPasswordChangePassword}
        />
        <Button
          transparent
          onPress={
            props.forgotPasswordShowPassword
              ? props.onForgotPasswordHidePassword
              : props.onForgotPasswordShowPassword
          }
        >
          {!props.forgotPasswordShowPassword ? (
            <Icon active name="ios-eye" />
          ) : (
            <Icon active name="ios-eye-off" />
          )}
        </Button>
      </Item>
    </Form>
    <View style={styles.buttonGroup}>
      <Button
        iconLeft
        block
        disabled={props.forgotPasswordSubmitting}
        onPress={props.onForgotPasswordSubmit}
      >
        <Text>
          {props.forgotPasswordSubmitting ? 'Submitting...' : 'Change Password'}
        </Text>
      </Button>
    </View>
    <ModalView
      hasError={props.forgotPasswordHasError}
      dismissFn={props.onForgotPasswordDismissError}
      errorTypes={props.forgotPasswordErrorTypes}
      {...props}
    />
  </View>
)

ForgotPasswordView.propTypes = {
  onForgotPasswordChangeMobile: PropTypes.func,
  onForgotPasswordSendVcode: PropTypes.func,
  onForgotPasswordChangeVcode: PropTypes.func,
  onForgotPasswordChangePassword: PropTypes.func,
  onForgotPasswordShowPassword: PropTypes.func,
  onForgotPasswordHidePassword: PropTypes.func,
  onForgotPasswordSubmit: PropTypes.func,
  onForgotPasswordDismissError: PropTypes.func
}

ForgotPasswordView.displayName = 'ForgotPasswordView'

export default ForgotPasswordView
