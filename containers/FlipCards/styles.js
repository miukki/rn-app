import { StyleSheet, Platform } from 'react-native'

const platform = Platform.OS

export default StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  iconContainerStyle: {
    height: 80
  },
  textContainerStyle: {
    alignItems: 'center'
  },
  listItemStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 500
  },
  iconStyle: {
    fontSize: platform === 'ios' ? 60 : 65,
    color: 'rgba(67, 60, 58, 1)',
    paddingTop: platform === 'ios' ? 4 : 8,
    paddingLeft: 6,
    paddingRight: 6
  },
  vocabWordStyle: {
    fontSize: 32,
    color: 'rgba(67, 60, 58, 1)',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 32,
    color: 'rgba(67, 60, 58, 1)',
    fontWeight: 'bold',
    paddingBottom: 10
  },
  completedContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
