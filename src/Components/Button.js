import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {width, heightScale, Colors, scale, Font} from '../Common/styles';
const widthDevice = Math.round(Dimensions.get('window').width)

const Button = (props) => {
  const {
    isLoading = false,
    icon,
    onPress,
    label,
    style,
    iconStyle,
    styleInside,
    textStyle,
    isDisable,
    urlImage,
    styleImage,
  } = props;

  return (
    <TouchableOpacity
      disabled={isDisable || isLoading}
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.container, isDisable && styles.grayBg, style]}>
      <View style={[styles.rowBtn, styleInside]}>
        {icon ? (
          <View style={[styles.paddingIcon, iconStyle]}>{icon}</View>
        ) : null}
        <Text style={[styles.label, textStyle]}>
          {isLoading ? 'Loading...' : label}
        </Text>
        {urlImage && (
          <Image
            source={{uri: urlImage}}
            style={styleImage}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  grayBg: {
    opacity: 0.5,
  },
  container: {
    width: width(90),
    height: heightScale(6.5),
    borderRadius: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(0.5),
    borderColor: Colors.GRAY3,
  },
  textBlack: {
    color: Colors.TEXT,
  },
  paddingIcon: {
    marginRight: width(2.5),
  },
  rowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontFamily: Font.BOLD,
    fontSize: widthDevice * 0.04,
    color: Colors.WHITE,
  },
});
export default Button;
