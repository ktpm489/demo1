import {StyleSheet,Dimensions} from 'react-native'
import color from '../../Values/Color'

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

export default StyleSheet.create({
    container:{
        width: '100%',
        height: height / 12,
        backgroundColor: color.bg_pink,
        flexDirection: 'row'
    },
    title:{
        color: color.text_purple,
        fontSize: height / 35
    },
    icon:{
        width: '80%',
        height: '80%',
        borderRadius: height / 30 / 2,
        tintColor: color.ic_red
    },
    viewIcon:{
        width: height / 25,
        height: height / 25,
        marginHorizontal: width / 15,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius: height / 25 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.bg_pink
    }
})