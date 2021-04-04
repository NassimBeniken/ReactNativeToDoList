import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from "react-native-animatable";

class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const item = this.props.item
        const deleteItem = this.props.function
        const date = this.props.item.date
        return(
            <Animatable.View style={styles.taskView} animation="bounceInDown" iterationCount={1}>
                <TouchableOpacity activeOpacity={0.5} onLongPress={() => deleteItem(item.key)} onPress={() => console.log("OnPress")}>
                    <Text style={styles.taskText}>{this.props.item.text}</Text>
                </TouchableOpacity>
            </Animatable.View>
            
        )
    }
    
}

const styles = StyleSheet.create({
    taskView: {
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        shadowOpacity: 0.2,
        shadowOffset: { height: 10 },
        borderColor: "#0C9B99",
        borderWidth: 2,
        minHeight: 70
    },
    taskText: {
        fontFamily: "Montserrat-Regular",
        fontSize: 20
    }
})

export default ListItem