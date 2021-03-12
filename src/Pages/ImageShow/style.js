import {StyleSheet, Dimensions} from 'react-native'
import color from '../../Values/Color'

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)
const size = ((width - (width / 20) * 2 - (width / 100) * 6) / 3)

export default StyleSheet.create({
    bg:{
        width: '100%',
        height: '100%',
        backgroundColor: color.bg_pink
    },
    image:{
        width: '100%',
        height: height - (height / 12),
        backgroundColor: color.bg_pink
    }
})