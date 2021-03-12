import {StyleSheet, Dimensions} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import color from '../../Values/Color'

const height = Math.round(Dimensions.get('window').height)
const width = Math.round(Dimensions.get('window').width)
const textSize = height / 40

export default StyleSheet.create({
    view:{
        width: width,
        height: height - getStatusBarHeight()
    },
    container:{
        flex: 1,
        backgroundColor: color.bg_pink,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn:{
        backgroundColor: color.bg_pink,
        width: '80%',
        height: height / 15,
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        backgroundColor: color.bg_pink,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: height / 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: height / 30,
        height: height / 30,
        marginHorizontal: width / 30
    },
    text:{
        textAlign: 'center',
        color: color.text_purple,
        fontSize: textSize,
        flex: 1
    },
    input:{
        width: '80%',
        height: height / 15,
        backgroundColor: '#FFFFFF',
        borderRadius: height / 30,
        paddingHorizontal: height / 70,
        textAlign: 'center',
        marginBottom: height / 30,
        fontSize: textSize,
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    btnSend:{
        flex: 3,
        borderLeftColor: '#FFFFFF',
        borderLeftWidth: height / 500,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    textBtn:{
        color: color.text_purple,
        fontSize: height / 50,
    },
    title:{
        textAlign: 'center',
        color: color.text_purple,
        fontSize: textSize,
        marginBottom: height / 30
    },
    container1:{
        width: '80%',
        height: height / 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    or:{
        textAlign: 'center',
        color: color.black,
        fontSize: height / 50,
        marginVertical: height / 40
    },
    border:{
        backgroundColor: color.bg_pink,
        width: height / 15,
        height: height / 15,
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        backgroundColor: color.bg_pink,
        borderRadius: height,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: height / 50
    },
    logo:{
        width: (width / 10) * 5,
        height: height / 10,
        marginBottom: height / 10
    }
})