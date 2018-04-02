import React from 'react' // eslint-disable-line no-unused-vars
import { Picker } from 'react-native'

export default props => (
  <Picker
    mode="dropdown"
    selectedValue={props.dailyWordsAmount}
    onValueChange={value => props.changeDailyWordsAmount(value)}
  >
    {props.dailyWordsAmounts.map(words => (
      <Picker.Item label={`${words} words`} value={words} key={words} />
    ))}
  </Picker>
)
