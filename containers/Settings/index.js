import { connect } from 'react-redux'
import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {
  StyleProvider,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Title
} from 'native-base'
import { Navigator } from '../../routers/Root'
import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'

import * as selectors from '../../redux-modules/auth/token/selector'
import * as actions from '../../redux-modules/auth/token/actions'

class Settings extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(common)}>
        <Container>
          <Header>
            <Body>
              <Title>Settings</Title>
            </Body>
          </Header>
          <Content>
            <List>
              <ListItem
                icon
                onPress={() => this.props.onSignOut()}
                style={{ backgroundColor: null }}
              >
                <Left>
                  <Icon name="log-out" />
                </Left>
                <Body>
                  <Text>Sign Out - {this.props.user.phone_number}</Text>
                </Body>
                <Right />
              </ListItem>
              <ListItem icon style={{ backgroundColor: null }}>
                <Left>
                  <Icon name="plane" />
                </Left>
                <Body>
                  <Text>Airplane Mode</Text>
                </Body>
                <Right>
                  <Switch value={false} />
                </Right>
              </ListItem>
              <ListItem icon style={{ backgroundColor: null }}>
                <Left>
                  <Icon name="wifi" />
                </Left>
                <Body>
                  <Text>Wi-Fi</Text>
                </Body>
                <Right>
                  <Text>GeekyAnts</Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon style={{ backgroundColor: null }}>
                <Left>
                  <Icon name="bluetooth" />
                </Left>
                <Body>
                  <Text>Bluetooth</Text>
                </Body>
                <Right>
                  <Text>On</Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon style={{ backgroundColor: null }}>
                <Left>
                  <Icon name="ios-information-circle-outline" />
                </Left>
                <Body>
                  <Text>Version: v1.0.0</Text>
                </Body>
                <Right />
              </ListItem>
            </List>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: selectors.selectUser(state.get('token'))
})

const mapDispatchToProps = dispatch => ({
  onSignOut: () => {
    dispatch(actions.deleteJWT())
    dispatch(Navigator.router.getActionForPathAndParams('Login'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
