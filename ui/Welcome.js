import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import * as styled from './styles';

export class Welcome extends Component {
  static navigationOptions = {
    drawerLabel: 'WELCOME',
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  render() {
    return (
      <styled.MainContainer>
        <styled.Content>
          <styled.MainSection>
            <styled.Title>hello</styled.Title>
            <styled.Subtitle>Styleguide System</styled.Subtitle>
          </styled.MainSection>
          <styled.Footer>
            <styled.Note
              onPress={this.openDrawer}
            >
              open the drawer or slide :)
            </styled.Note>
          </styled.Footer>
        </styled.Content>
      </styled.MainContainer>
    );
  }
}
