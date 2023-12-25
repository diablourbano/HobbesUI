import React from 'react';
import {View, Text} from 'react-native';
import {functional} from '../functional';

export const UI = () => {
  const stories = functional.getStructuredStories();

  return (
    <View>
      {Object.keys(stories).map(parent => (
        <View key={parent}>
          <Text>{parent}</Text>
        </View>
      ))}
    </View>
  );
};
