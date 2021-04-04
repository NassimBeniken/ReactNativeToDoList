import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from "react-native-animatable"
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

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
                    <View style={{flexDirection: "row", marginBottom: 5}}>
                        <Ionicons name="today-sharp" size={24} color="#0C9B99" />
                        <Text style={styles.date}>{date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <MaterialIcons name="subdirectory-arrow-right" size={24} color="#0C9B99" />
                        <Text style={styles.taskText}>{this.props.item.text}</Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
            
        )
    }
    
}

const styles = StyleSheet.create({
    taskView: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        elevation: 10,
        shadowOpacity: 0.2,
        shadowOffset: { height: 10 },
        borderColor: "#0C9B99",
        borderWidth: 2
    },
    taskText: {
        fontFamily: "Montserrat-Regular",
        fontSize: 20,
        paddingLeft: 10
    },
    date: {
        fontSize: 20 ,
        fontFamily: "Montserrat-Regular",
        paddingLeft: 10,
        color: "#0C9B99"
    }
})

export default ListItem