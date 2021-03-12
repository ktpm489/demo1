import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  overFlow: {
    overflow: 'hidden',
  },
});

export const ImageRender = (props) => {
  const {style, data, type = 'uri', resizeMode = 'cover'} = props;
  let isUri = type === 'uri';
  return (
    <View style={[styles.overFlow, style]}>
      <Image
        source={isUri ? {uri: data} : data}
        resizeMode={resizeMode}
        style={style}
      />
    </View>
  );
};
