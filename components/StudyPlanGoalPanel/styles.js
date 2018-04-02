import { StyleSheet } from 'react-native'
import { textColorH3 } from '../../native-base-theme/variables/commonColor'

export default StyleSheet.create({
  card: {
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'white'
  },

  planTrigger: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row'
  },

  planIconiOS: {
    fontSize: 18,
    lineHeight: 20,
    color: textColorH3
  },

  planIconAndroid: {
    fontSize: 18,
    lineHeight: 22,
    color: textColorH3
  },

  dropdownPickerText: {
    fontSize: 2,
    color: 'yellow'
  },

  stat: {
    width: '50%',
    lineHeight: 35
  },

  statNumber: {
    textAlign: 'right'
  }

});
