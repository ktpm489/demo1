import React from 'react'
import {
    View,
    ActivityIndicator,
    Modal 
} from 'react-native'

export default function LoadingDialog(props){
    const {show} = props
    return(
        <Modal onRequestClose={() => null} visible={show}
            transparent={true}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating size="large" color="#FAEFEF"/>
            </View>
        </Modal>
    )
}