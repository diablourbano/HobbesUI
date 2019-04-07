import React from 'react';
import * as styled from '../styles';

export const ItemComponent = (props) => {
  const { hasPadding, onPress, isActive = false, title } = props;

  return !title || !onPress ? null :(
    <styled.Item
      hasPadding={hasPadding}
      onPress={onPress}
    >
      <styled.ItemList
        isActive={isActive}
      >
        {title} {isActive ? '•' : ''}
      </styled.ItemList>
    </styled.Item>
  );
}
