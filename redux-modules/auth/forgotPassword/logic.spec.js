import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createMockStore } from 'redux-logic-test'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'

import reducer, { initialState } from './'
import types from './types'
import logic from './logic'

const rootReducer = combineReducers({ forgotPassword: reducer })

// TODO: figureout jest.useFakeTimers()

describe('forgotPassword', () => {
  describe('checkMobile', function() {
    it('reject action when mobile length wrong when SEND_VCODE', function(done) {
      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '1800000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {}
      })
      store.dispatch({
        type: types.SEND_VCODE
      })
      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('reject action when mobile length wrong when SUBMIT', function(done) {
      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '1800000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {}
      })
      store.dispatch({
        type: types.SUBMIT
      })
      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('allow action when mobile OK', function(done) {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.resolve({ data: { token: 'jwt-token' } })
      )

      const setJWT = jest.fn()
      setJWT.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          customerIamApiSdkJs: { resetPassword },
          Storage: { setJWT }
        }
      })
      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })

  describe('dispatchCountdownVcode, countdownVcode', function() {
    it('start countdown after SEND_VCODE_DONE', function(done) {
      const sendSMS = jest.fn()
      sendSMS.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '18000000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { sendSMS } }
      })

      store.dispatch({
        type: types.SEND_VCODE
      })

      store.whenComplete().then(() => {
        expect(store.actions).toHaveLength(122)
        done()
      })
    })
  })

  describe('sendSMS', () => {
    it('request IAM API send vcode SMS', done => {
      const sendSMS = jest.fn()
      sendSMS.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '18000000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { sendSMS } }
      })

      store.dispatch({
        type: types.SEND_VCODE
      })

      store.whenComplete().then(() => {
        expect(sendSMS.mock.calls[0]).toMatchSnapshot()
        expect(store.actions.slice(0, 2)).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when networkError', done => {
      const sendSMS = jest.fn()
      sendSMS.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.NETWORK_ERROR)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '18000000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { sendSMS } }
      })

      store.dispatch({
        type: types.SEND_VCODE
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when serverError', done => {
      const sendSMS = jest.fn()
      sendSMS.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.SERVER_ERROR)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState.set('mobile', '18000000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { sendSMS } }
      })

      store.dispatch({
        type: types.SEND_VCODE
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })

  describe('resetPassword', () => {
    it('request JWT from API and set it to storage', done => {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.resolve({ data: { token: 'jwt-token' } })
      )

      const setJWT = jest.fn()
      setJWT.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          customerIamApiSdkJs: { resetPassword },
          Storage: { setJWT }
        }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(resetPassword.mock.calls[0]).toMatchSnapshot()
        expect(setJWT.mock.calls[0]).toMatchSnapshot()
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when wrongVcode', done => {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.VERIFICATION_CODE_ERROR)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { resetPassword } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when networkError', done => {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.NETWORK_ERROR)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { resetPassword } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when serverError', done => {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.SERVER_ERROR)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { resetPassword } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when user not exist', done => {
      const resetPassword = jest.fn()
      resetPassword.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.USER_NOT_EXIST)
      )

      const store = createMockStore({
        initialState: fromJS({
          forgotPassword: initialState
            .set('mobile', '18000000000')
            .set('vcode', '666666')
            .set('password', 'passwd')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { resetPassword } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })
})
