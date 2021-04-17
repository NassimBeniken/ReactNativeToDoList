import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import * as Animatable from "react-native-animatable"
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

class ListItem extends React.Component {
    constructor(props) {
        super(props)
        this.item = this.props.item
        this.deleteItem = this.props.function
        this.date = this.props.item.date
    }

    handleItemRef = ref => this.list_item = ref

    handleLongPress = () => {
        Alert.alert(
            "Suppression",
            "Voulez-vous vraiment supprimer cette tâche ?",
            [
                {
                    text: "Annuler",
                    style: "default"
                },
                {
                    text: "Oui",
                    onPress: () => {
                        this.list_item.bounceOutLeft().then(endstate => this.deleteItem(this.item.key))
                    },
                    style: "destructive"
                }
            ]
        )
    }

    render() {
        return(
            <Animatable.View ref={this.handleItemRef} style={styles.taskView} animation="bounceInDown" iterationCount={1}>
                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onLongPress={() => this.handleLongPress()}>
                    <View style={{flexDirection: "row", marginBottom: 5}}>
                        <Ionicons name="today-sharp" size={20} color="#0C9B99" />
                        <Text style={styles.date}>{this.date}</Text>
                    </View>
                    <View style={{flexDirection: "row", paddingRight: 20}}>
                        <MaterialIcons name="subdirectory-arrow-right" size={20} color="#0C9B99" />
                        <Text style={styles.taskText}>{this.item.text}</Text>
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
        fontSize: 15,
        marginLeft: 10,
        textAlign: "justify"
    },
    date: {
        fontSize: 17 ,
        fontFamily: "Montserrat-Regular",
        marginLeft: 10,
        color: "#0C9B99"
    }
})

export default ListItem