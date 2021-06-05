import React from 'react';
import * as styled from './styles';

export const Welcome = (props) => {
  const { navigation } = props;

  return (
    <styled.MainContainer>
      <styled.Content>
        <styled.MainSection>
          <styled.Title>hello</styled.Title>
          <styled.Subtitle>HobbesUI</styled.Subtitle>
        </styled.MainSection>
        <styled.Footer>
          <styled.Note
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            open the drawer or slide :)
          </styled.Note>
        </styled.Footer>
      </styled.Content>
    </styled.MainContainer>
  );
};
