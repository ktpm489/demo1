import {StyleSheet, Dimensions} from 'react-native'
import color from '../../Values/Color'

const height = Math.round(Dimensions.get('window').height)
const textSize = Math.round(Dimensions.get('window').height) / 30

export default StyleSheet.create({
    container:{
        flex: 1,
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: color.bg_pink
    },
    bg_item:{
        flexDirection: 'row',
        width: '90%',
        height: '10%',
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
        marginBottom: height / 30
    },
    view_title:{
        flex: 8,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        flex: 2,
        height: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    title:{
        color: color.red,
        fontSize: textSize
    },
    view:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})