import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Animatable from "react-native-animatable";

const Header = (props) => {
    return(
        <View>
            <View style={styles.subheader} />
            <View style={styles.header}>
                <Animatable.View animation="bounceInLeft" iterationCount={1}>
                    <Text style={styles.text}>{props.title}</Text>
                </Animatable.View>
            </View> 
        </View>
        
    )
}

export default Header

const styles = StyleSheet.create({
    subheader: {
        backgroundColor: "#0C9B99",
        height: 40
    },
    header: {
        backgroundColor: "#0C9B99",
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        elevation: 15,
        shadowOpacity: 0.2,
        shadowOffset: { height: 7 },
        marginBottom: 10
    },
    text: {
        color: "white",
        borderColor: "#FFFFFF",
        padding : 10,
        borderWidth: 2,
        borderRadius: 7,
        fontSize: 30,
        fontFamily: "Montserrat-Medium"
    }
})