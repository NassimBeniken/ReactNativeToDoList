import React from 'react'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from "react-native-animatable"

class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity accessibilityRole="button" style={styles.button} onPress={() => this.props.function()}>
                    <AntDesign name="plus" size={40} color="#FFFFFF" />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#0C9B99",
        padding: 10,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 15,
        shadowOpacity: 0.2,
        shadowOffset: { height: 7 },
      }
})

export default Animatable.createAnimatableComponent(AddButton)