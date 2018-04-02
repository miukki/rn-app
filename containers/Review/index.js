// @flow

import { connect } from 'react-redux'
import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {
  Body,
  Button,
  Content,
  Header,
  Text,
  Title,
  StyleProvider,
  View,
  H1
} from 'native-base'
import PropTypes from 'prop-types'
import { onFlipCardsGenerateNewWords } from '../../redux-modules/review/actions'
import { Navigator } from '../../routers/Root'
import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import { selectLearnedWordsByUser } from '../../redux-modules/studyPlan/selector'
import appConfig from '../../config'

const mapStateToProps = (state, ownProps) => {
  return {
    learnedWordsByUser: selectLearnedWordsByUser(state.get('studyPlan'))
  }
}

const mapDispatchToProps = dispatch => ({
  onFlipCardsBtnPress: () => {
    dispatch(Navigator.router.getActionForPathAndParams('FlipCards'))
  },
  onFlipCardsGenerateNewWords: (learnedWordsByUser: Array) =>
    dispatch(onFlipCardsGenerateNewWords(learnedWordsByUser))
})

const Review = ({
  learnedWordsByUser,
  onFlipCardsBtnPress,
  onFlipCardsGenerateNewWords,
  ...rest
}) => (
  <StyleProvider style={getTheme(common)}>
    <View style={{ flex: 1 }}>
      <Header>
        <Body>
          <Title>Review</Title>
        </Body>
      </Header>
      <Content padder>
        <H1>Review with flashcards</H1>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Text>
            Review{' '}
            {appConfig.amountFlipCards < learnedWordsByUser.length
              ? appConfig.amountFlipCards
              : learnedWordsByUser.length}{' '}
            words you've learned
          </Text>
          <Button
            block
            disabled={!learnedWordsByUser.length}
            style={{ marginTop: 10 }}
            onPress={() => {
              if (learnedWordsByUser.length) {
                onFlipCardsGenerateNewWords(learnedWordsByUser)
                onFlipCardsBtnPress()
              }
            }}
          >
            <Text>Let's Review</Text>
          </Button>
        </View>
      </Content>
    </View>
  </StyleProvider>
)

Review.propTypes = {
  onFlipCardsGenerateNewWords: PropTypes.func,
  onFlipCardsBtnPress: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
