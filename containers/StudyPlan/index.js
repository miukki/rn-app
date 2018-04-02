import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import {
  View,
  Container,
  Button,
  Text,
  H1,
  H3,
  StyleProvider
} from 'native-base'
import PropTypes from 'prop-types'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import StudyPlanGoalPanel from '../../components/StudyPlanGoalPanel'

import * as selectors from '../../redux-modules/studyPlan/selector'
import * as practiceSelectors from '../../redux-modules/practice/selector'
import * as actions from '../../redux-modules/studyPlan/actions'

class StudyPlan extends Component {
  componentDidMount() {
    this.props.init()
  }

  goPractice(props) {
    let { startPractice, navigation } = props
    let {
      dailyGoalComplete,
      practiceRemain,
      wordsList,
      learnedWordsInWordsList,
      dailyWordsAmount
    } = props

    if (practiceRemain) {
      navigation.navigate('Practice')
      return
    }

    if (!dailyGoalComplete) {
      startPractice({
        wordsList,
        learnedWordsInWordsList,
        amount: dailyWordsAmount
      })
      navigation.navigate('Practice')
    }
  }

  render() {
    let { wordsListComplete, dailyGoalComplete, navigation } = this.props

    return (
      <StyleProvider style={getTheme(common)}>
        <Container padder>
          <H1>Daily Goal</H1>
          <StudyPlanGoalPanel {...this.props} />
          {wordsListComplete ? (
            <View>
              <H3>Vocab List Completed!</H3>
              <Button
                block
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('SelectWordsList')}
              >
                <Text>Select a new list</Text>
              </Button>
            </View>
          ) : dailyGoalComplete ? (
            <View>
              <H3>Daily Goal Completed!</H3>
              <Text>How about review the words you have learned?</Text>
              <Button
                block
                info
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('Review')}
              >
                <Text>Review Words</Text>
              </Button>
            </View>
          ) : (
            <Button block onPress={() => this.goPractice(this.props)}>
              <Text>Let's Practice</Text>
            </Button>
          )}
        </Container>
      </StyleProvider>
    )
  }
}

StudyPlan.propTypes = {
  navigation: PropTypes.object,

  // statistic
  wordsListUid: PropTypes.string,
  wordsList: PropTypes.array,
  learnedWordsInWordsList: PropTypes.array,
  checkinLogs: PropTypes.array,
  dailyWordsAmount: PropTypes.number,
  wordsListWordsAmount: PropTypes.number,
  daysLeft: PropTypes.number,

  // picker
  showDaysPicker: PropTypes.bool,
  dailyWordsAmounts: PropTypes.array,
  daysAmounts: PropTypes.array,
  pickerDailyWordsAmount: PropTypes.number,
  pickerDaysAmount: PropTypes.number,

  // Study Plan status
  dailyGoalComplete: PropTypes.bool,
  wordsListComplete: PropTypes.bool,
  practiceRemain: PropTypes.number,

  // functions
  onShowDaysPicker: PropTypes.func,
  onConfirmDaysPicker: PropTypes.func,
  onHideDaysPicker: PropTypes.func,
  changeDailyWordsAmount: PropTypes.func,
  changeDaysAmount: PropTypes.func,
  startPractice: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  wordsList: selectors.selectWordsList(state.get('studyPlan')),
  dailyWordsAmount: selectors.selectDailyWordsAmount(state.get('studyPlan')),
  learnedWordsInWordsList: selectors.selectLearnedWordsInWordsList(
    state.get('studyPlan')
  ),
  checkinLogs: selectors.selectCheckinLogs(state.get('studyPlan')),
  wordsListUid: selectors.selectWordsListUid(state.get('studyPlan')),
  wordsListWordsAmount: selectors.selectWordsListAmount(state.get('studyPlan')),
  daysLeft: selectors.selectDaysLeft(state.get('studyPlan')),

  // picker
  showDaysPicker: selectors.selectShowDaysPicker(state.get('studyPlan')),
  dailyWordsAmounts: selectors.selectDailyWordsAmounts(state.get('studyPlan')),
  daysAmounts: selectors.selectDaysAmounts(state.get('studyPlan')),
  pickerDailyWordsAmount: selectors.selectPickerDailyWordsAmount(
    state.get('studyPlan')
  ),
  pickerDaysAmount: selectors.selectPickerDaysAmount(state.get('studyPlan')),

  // Study Plan status
  dailyGoalComplete: selectors.selecteDailyGoalComplete(state.get('studyPlan')),
  wordsListComplete: selectors.selectWordsListComplete(state.get('studyPlan')),
  practiceRemain: practiceSelectors.selectRemain(state.get('practice'))
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(actions.init()),
  onShowDaysPicker: () => dispatch(actions.showDaysPicker()),
  onConfirmDaysPicker: () => dispatch(actions.confirmDaysPicker()),
  onHideDaysPicker: () => dispatch(actions.hideDaysPicker()),
  changeDailyWordsAmount: index =>
    dispatch(actions.changeDailyWordsAmount(index)),
  changeDaysAmount: index => dispatch(actions.changeDaysAmount(index)),
  startPractice: ({ wordsList, learnedWordsInWordsList, amount }) =>
    dispatch(
      actions.startPractice({ wordsList, learnedWordsInWordsList, amount })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(StudyPlan)
