/*global Expo */
// @flow
import * as types from './types'

export const renderEmpty = () => {
  return {
    type: types.RENDER_EMPTY
  }
}

export const onFlipCardsGenerateNewWords = (learnedWordsByUser: Array) => {
  return {
    type: types.RENDER_START,
    payload: { learnedWordsByUser }
  }
}

export const onFlipCardsReloadWords = () => {
  return {
    type: types.RENDER_RELOAD
  }
}

export const updateRemainAmount = () => {
  return {
    type: types.UPDATE_REMAIN_AMOUNT
  }
}

export const textToSpeech = (text: string) => {
  return (dispatch, getState) => {
    Expo.Speech.speak(text)
  }
}
