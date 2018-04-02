// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  Body,
  Content,
  Header,
  Title,
  Text,
  View,
  Button,
  Right,
  Left,
  Icon,
  H1,
  StyleProvider
} from 'native-base'
import * as Progress from 'react-native-progress'
import { FlipCards } from 'prepsmith-react-native-components'
import {
  renderEmpty,
  onFlipCardsGenerateNewWords,
  onFlipCardsReloadWords,
  textToSpeech,
  updateRemainAmount
} from '../../redux-modules/review/actions'
import {
  selectIsOver,
  selectItems,
  selectWarning,
  selectPlanAmount,
  selectRemain
} from '../../redux-modules/review/selector'
import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import styles from './styles'
import { selectLearnedWordsByUser } from '../../redux-modules/studyPlan/selector'

const mapStateToProps = (state, ownProps) => {
  return {
    isOver: selectIsOver(state.get('review')),
    items: selectItems(state.get('review')),
    warning: selectWarning(state.get('review')),
    learnedWordsByUser: selectLearnedWordsByUser(state.get('studyPlan')),
    planAmount: selectPlanAmount(state.get('review')),
    remain: selectRemain(state.get('review'))
  }
}

const mapDispatchToProps = dispatch => ({
  renderEmpty: () => dispatch(renderEmpty()),
  onFlipCardsGenerateNewWords: (learnedWordsByUser: Array) =>
    dispatch(onFlipCardsGenerateNewWords(learnedWordsByUser)),
  onFlipCardsReloadWords: () => dispatch(onFlipCardsReloadWords()),
  onTextToSpeech: (word: string) => dispatch(textToSpeech(word)),
  updateRemainAmount: () => dispatch(updateRemainAmount())
})

const Wrapper = ({
  navigation,
  isOver,
  items,
  warning,
  planAmount,
  remain,
  learnedWordsByUser,
  renderEmpty,
  onFlipCardsReloadWords,
  onFlipCardsGenerateNewWords,
  onTextToSpeech,
  updateRemainAmount,
  ...rest
}) => (
  <StyleProvider style={getTheme(common)}>
    <View style={{ flex: 1 }}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Flip Cards</Title>
        </Body>
        <Right>
          <Button transparent />
        </Right>
      </Header>
      <Progress.Bar
        progress={remain / planAmount}
        width={null}
        borderRadius={0}
      />
      {isOver ? (
        <Content padder>
          <View style={styles.completedContainer}>
            <H1>Review Completed!</H1>
            <Button
              block
              info
              style={{ marginTop: 20 }}
              onPress={() => {
                onFlipCardsReloadWords()
              }}
            >
              <Text>Review Again</Text>
            </Button>
            <Button
              block
              style={{ marginTop: 20 }}
              onPress={() => {
                onFlipCardsGenerateNewWords(learnedWordsByUser)
              }}
            >
              <Text>New Words</Text>
            </Button>
          </View>
        </Content>
      ) : (
        <View padder>
          <FlipCards
            remain={remain}
            listItemStyle={styles.listItemStyle}
            onTextToSpeech={onTextToSpeech}
            items={items}
            warning={warning}
            cardStyle={styles.cardStyle}
            vocabWordStyle={styles.vocabWordStyle}
            iconStyle={styles.iconStyle}
            textContainerStyle={styles.textContainerStyle}
            iconContainerStyle={styles.iconContainerStyle}
            descriptionStyle={styles.descriptionStyle}
            renderEmpty={renderEmpty}
            updateRemainAmount={updateRemainAmount}
          />
        </View>
      )}
    </View>
  </StyleProvider>
)

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
