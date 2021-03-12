import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
// import styles from './styles';
// import {isIphoneX} from '../../Common/styles';
import images from '../../Assets/Images';
import {
  width,
  heightScale,
  topNavBarIOS,
  heightNavBar,
  isIphoneX,
  height,
  scale,
} from '../../Common/styles';

const CoreHeader = (props) => {
  const {
    customRightStyle,
    title,
    rightIcon,
    leftIcon,
    middleView,
    headerStyle,
    leftAction,
    rightAction,
    rightView,
    disabledCustomRightIcon = false,
    customTitleStyle,
    leftStyle,
    rightStyle,
  } = props;

  return (
    // Page detail header: showing in a detail page with a back button
    <View
      style={[
        styles.detailHeaderContainer,
        headerStyle,
        isIphoneX && styles.headIphoneX,
      ]}>
      <TouchableOpacity
        onPress={leftAction}
        activeOpacity={0.7}
        style={[styles.leftView, middleView && styles.icBackMiddle, leftStyle]}>
        {leftIcon || <Image source={images.icBack} style={styles.iconBack} />}
      </TouchableOpacity>
      {middleView ? (
        <View style={[styles.middleView, rightView && styles.middleSmall]}>
          {middleView}
        </View>
      ) : (
        <View style={[styles.middleView, rightView && styles.middleSmall]}>
          <Text numberOfLines={1} style={[styles.txtTitle, customTitleStyle]}>
            {title}
          </Text>
        </View>
      )}
      {rightView ||
        (rightAction ? (
          <TouchableOpacity
            onPress={rightAction}
            disabled={disabledCustomRightIcon}
            activeOpacity={0.7}
            style={[
              styles.rightView,
              middleView && styles.icBackMiddle,
              customRightStyle,
              rightStyle,
            ]}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.rightView} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailHeaderContainer: {
    // zIndex: 9999999999,
    width: width(100),
    justifyContent: 'center',
    paddingTop: isIphoneX ? topNavBarIOS : 0,
    // height: heightNavBar,
    flexDirection: 'row',
    paddingRight: width(5),
    // alignItems: 'center',
    backgroundColor: '#FF9DB8',
  },
  // main header
  mainHeaderContainer: {
    // zIndex: 9999999999,
    width: width(100),
    justifyContent: 'space-between',
    // paddingTop: isIphoneX ? topNavBarIOS + height(0.5) : topNavBarIOS,
    flexDirection: 'row',
    alignItems: 'center',
    height: heightNavBar,
    borderBottomColor: 'gray',
    borderBottomWidth: scale(1),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.5,
    shadowRadius: 2,
    elevation: 15,
    backgroundColor: 'gray',
    // zIndex: 9
  },
  headIphoneX: {
    paddingTop: heightScale(5),
  },
  leftView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: width(17),
    paddingVertical: isIphoneX ? heightScale(3) : heightScale(2.5),
    paddingLeft: width(5),
  },
  icBackMiddle: {
    alignSelf: 'flex-start',
  },
  middleSmall: {
    width: width(45),
  },
  middleView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width(65),
  },

  txtTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: width(5.5),
    fontWeight: 'bold',
  },
  rightView: {
    width: width(12),
    alignItems: 'flex-end',
  },

  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width(5),
  },
  imgHeaderLogo: {
    height: heightNavBar - height(4),
    width: (heightNavBar - height(4)) * 2.275,
    resizeMode: 'contain',
  },
  imgHeaderQr: {
    height: width(10),
    width: width(10),
    resizeMode: 'contain',
    marginLeft: width(3),
  },
  iconBack: {
    height: width(3.5),
    width: width(3.5),
    resizeMode: 'contain',
  },
  imgHeadeLip: {
    height: width(6),
    width: width(6),
    resizeMode: 'contain',
  },
  txtBalance: {
    fontWeight: 'bold',
    fontSize: width(4.5),
    marginLeft: width(1),
  },
});

export default CoreHeader;
