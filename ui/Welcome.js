import React from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import * as styled from './styles';

export const Welcome = (props) => {
  const { navigation } = props;

  return (
    <styled.MainContainer>
      <styled.Content>
        <styled.MainSection>
          <styled.Title>hello</styled.Title>
          <styled.Subtitle>Styleguide System</styled.Subtitle>
        </styled.MainSection>
        <styled.Footer>
          <styled.Note
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          >
            open the drawer or slide :)
          </styled.Note>
        </styled.Footer>
      </styled.Content>
    </styled.MainContainer>
  );
}
