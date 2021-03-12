import {Dimensions, Text, Platform, PixelRatio} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const CORE_RATIO = 667 / 375;
const MYWIDTH = Dimensions.get('window').width;
const MYHEIGHT = Dimensions.get('window').height;
const MYSCALE = CORE_RATIO / (MYHEIGHT / MYWIDTH);
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export const width = (num) =>
  PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100));
export const height = (num) =>
  PixelRatio.roundToNearestPixel(MYHEIGHT * (num / 100));
export const scale = (size) =>
  PixelRatio.roundToNearestPixel((MYWIDTH / guidelineBaseWidth) * size);
export const verticalScale = (size) =>
  PixelRatio.roundToNearestPixel((MYHEIGHT / guidelineBaseHeight) * size);
export const heightScale = (num) =>
  PixelRatio.roundToNearestPixel(MYHEIGHT * ((num * MYSCALE) / 100));
export const isIphoneX = Platform.OS === 'ios' && MYHEIGHT >= 812;
export const isNotchAndroid =
  Platform.OS === 'android' && DeviceInfo.hasNotch();
export const isRapidEar = isIphoneX || isNotchAndroid;
export const heightNavBar = heightScale(
  Platform.OS === 'ios' ? (isIphoneX ? 13 : 12) : isNotchAndroid ? 16 : 14,
);
export const heightFooter = height(11) - height(isIphoneX ? 2 : 2.5);
export const topNavBarIOS = heightScale(
  Platform.OS === 'ios' ? (isIphoneX ? 4 : 2) : isNotchAndroid ? 5 : 1.5,
);
export const navBarFit = heightScale(5);

export const setDefaultText = (customProps) => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    const oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

export const Font = {
  REGULAR: 'HelveticaNeue',
  MEDIUM: 'HelveticaNeueMedium',
  BOLD: 'Helvetica Bold',
  MEIRYO: 'meiryo',
};

export const HBCOLOR = {
  RED_ERROR: '#ff0040',
  RED_SEND: '#FF295C',
  GREEN_RECEIVE: '#24E37D',
  WHITE: '#F2F2F2',
  DEFAULT: '#07122D',
  ORANGE: '#fba45d',
  SELL_ORGRANCE: '#FF9D2F',
  LINK: '#007DFA',
  YELLOW_TRANSACTION_FEE: '#ffba00',
  GREEN_SENT: '#24E37D',
  RED_RECEIVED: '#FF295C',
  ACTIVE_INPUT: '#1b3559',
  INPUT_ERR: '#EB5757',
  NOT_ACTIVE: '#555555',
  SENT_FAILED: '#CF9826',
  GRAY: '#CDCDCD',
  DARK_BLUE: '#535E7A',
  TEXT_COLOR: '#535E7A',
  NOT_ACTIVE_BTN: '#535E7A',
};

export const Colors = {
  WHITE: '#FFFFFF',
  GRAY: '#BDBDBD',
  GRAY1: '#828282',
  GRAY2: '#E0E0E0',
  GRAY3: '#F2F2F2',
  GRAY4: '#98A0A8',
  RED: '#EB5757',
  BLUE: '#0062D2',
  BLUE1: '#2F80ED',
  BLUE3: '#49ACFF',
  BLACK1: '#141414',
  TEXT: '#333333',
  ORANGE: '#F2994A',
  GREEN: '#27AE60',
  HEADERLINE: '#00E8B4',
  DARK_BLUE: '#535E7A',
  BLUE2: '#1D2B47',
  RED_ERROR: '#ff0040',
  RED_SEND: '#FF295C',
  GREEN_RECEIVE: '#24E37D',
  DEFAULT: '#07122D',
  SELL_ORGRANCE: '#FF9D2F',
  LINK: '#007DFA',
  BLACK: '#000000',
  YELLOW_TRANSACTION_FEE: '#ffba00',
  GREEN_SENT: '#24E37D',
  RED_RECEIVED: '#FF295C',
  ACTIVE_INPUT: '#1b3559',
  INPUT_ERR: '#ff0040',
  NOT_ACTIVE: '#555555',
  SENT_FAILED: '#CF9826',
  TEXT_COLOR: '#535E7A',
  NOT_ACTIVE_BTN: '#535E7A',
  ORANGE1: '#828282',
  PURPLE: '#9b51e0',
  PURPLE1: '#9C9BFA',
  PURPLE2: '#787DFF',
  TEXT1: '#828282',
  YELLOW: '#DAA400',
};

export const DarkColors = {
  WHITE: '#FFFFFF',
  GRAY: '#BDBDBD',
  GRAY1: '#828282',
  GRAY2: '#E0E0E0',
  GRAY3: '#F2F2F2',
  GRAY4: '#49535E',
  RED: '#EB5757',
  BLUE: '#00A3FF',
  BLUE1: '#2F80ED',
  TEXT: '#FFFFFF',
  ORANGE: '#F28626',
  GREEN: '#00E8B4',
  HEADERLINE: '#00E8B4',
  DARK_BLUE: '#535E7A',
  BLUE2: '#242D36',
  RED_ERROR: '#ff0040',
  RED_SEND: '#FF295C',
  GREEN_RECEIVE: '#00E8B4',
  DEFAULT: '#07122D',
  SELL_ORGRANCE: '#FF9D2F',
  LINK: '#007DFA',
  BLACK: '#000000',
  YELLOW_TRANSACTION_FEE: '#ffba00',
  GREEN_SENT: '#00E8B4',
  RED_RECEIVED: '#FF295C',
  ACTIVE_INPUT: '#1b3559',
  INPUT_ERR: '#ff0040',
  NOT_ACTIVE: '#555555',
  SENT_FAILED: '#CF9826',
  TEXT_COLOR: '#535E7A',
  NOT_ACTIVE_BTN: '#535E7A',
  ORANGE1: '#828282',
  PURPLE: '#9b51e0',
  PURPLE1: '#9C9BFA',
  DARK_BACKGROUND: '#12171d',
  DARK_HEADER: '#000000',
  DARK_BACKGROUND_BOX: '#171F2A',
  DARK_BACKGROUND_BOX_LINE: '#242D36',
  TEXT1: '#535E7A',
  TEXT2: '#8B98A4',
  BLUE3: '#2F80ED',
  BLUE4: '#171F2A',
};

export const txtDefault = {
  color: Colors.TEXT,
  fontSize: width(4),
  backgroundColor: 'transparent',
  fontFamily: Font.MEDIUM,
};

export const txtJapan = {
  color: Colors.TEXT,
  fontSize: width(3.5),
  backgroundColor: 'transparent',
  fontFamily: Font.MEIRYO,
};

export const imgFullScreen = {
  height: height(100),
  width: width(100),
};
