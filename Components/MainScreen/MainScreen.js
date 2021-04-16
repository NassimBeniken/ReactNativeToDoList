import React from 'react'
import Header from '../header/Header'
import { StyleSheet, Dimensions, View, FlatList, TextInput, Platform, Keyboard, TouchableOpacity, Text } from 'react-native'
import ListItem from '../ListItem/ListItem'
import * as Animatable from "react-native-animatable"
import AddButton from '../AddButton/AddButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            counter: 1,
            isViewVisible: false,
            showDate: false,
            date: new Date(),
            tache: "",
            dateText: "Date"
        }
    }

    /* componentDidMount = () => {
        this.load()
    } */

    /* save = async() => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        } catch(err) {
            console.log(err)
        }
    } */

    /* load = async() => {
        try {
            let jsonValue = await AsyncStorage.getItem("tasks")
            if(jsonValue !== null) {
                this.setState({
                    tasks: JSON.parse(jsonValue)
                })
            }
        } catch(err) {
            console.log(err)
        }
    } */

    handleModalRef = ref => this.modal = ref
    handleModalContainerRef = ref => this.modalContainer = ref

    onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        this.setState({
            date: currentDate,
            dateText: currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear(),
            showDate: false
        })
    }

    render() {
        return(
            <View style={styles.mainContainer}>     
                <Header title="Liste de tâches"/>
                <View style={styles.listView}>
                    <FlatList
                        data={this.state.tasks} 
                        renderItem={({item}) => <ListItem item={item} function={this.deleteItemByKey}/>}
                        style={styles.flatlist}
                        contentContainerStyle={{paddingBottom: 20}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                { this.state.isViewVisible ? (
                    <Animatable.View ref={this.handleModalContainerRef} animation="fadeIn" iterationCount={1} style={styles.dialog}>
                        <Animatable.View ref={this.handleModalRef} style={styles.dialog_container} animation="bounceInUp" iterationCount={1}>
                            <TextInput style={styles.textInput} placeholder="Votre tâche..." onChangeText={text => this.setState({ tache: text})} />
                            { Platform.OS === 'android' ? (
                                <TouchableOpacity style={styles.validateButton} onPress={() => this.setState({showDate: true})}>
                                    <Ionicons name="today-sharp" size={24} color="#FFF" />
                                    <Text style={styles.dateButton}>{this.state.dateText}</Text>
                                </TouchableOpacity>
                            ) : null}
                            { Platform.OS === 'ios' || this.state.showDate === true ? (
                                <View style={{width: "100%", alignItems: "center"}}>
                                    <DateTimePicker 
                                    value={this.state.date} 
                                    onChange={this.onDateChange}
                                    display="calendar"
                                    style={{width: "40%", height: 30}}/>
                                </View>
                            ) : null}
                            <TouchableOpacity style={styles.validateButton} onPress={this.handleValidateButtonPress}>
                                <Ionicons name="ios-checkmark-done" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </Animatable.View>
                    </Animatable.View>
                ) : null }
                    <AddButton 
                        function={this.handleAddButtonPress}
                        animation="bounceInDown"
                        useNativeDriver={true}/>
            </View>
        )
    }

    handleAddButtonPress = () => {
        this.setState({
            isViewVisible: true,
            tache: ""
        })
    }
    handleValidateButtonPress = () => {
        Keyboard.dismiss()
        /* this.save() */
        this.setState({
            tasks: this.state.tasks.concat([{key: (this.state.counter + 1).toString(), text: this.state.tache, date: this.state.date }]),
            counter: this.state.counter + 1
        })
        this.modal.bounceOutDown().then(endstate => this.setState({
            isViewVisible: false
        }))
        this.modalContainer.fadeOut()
    }

    deleteItemByKey = (key) => {
        const filteredTasks = this.state.tasks.filter(item => item.key !== key);
        this.setState({ 
            tasks: filteredTasks });
      }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        minHeight: Math.round(Dimensions.get('window').height),
    },
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
    },
    listView: {
      flex: 1,
      alignItems: "center"
    },
    flatlist: {
      flex:1,
      width: "90%",
      marginBottom: 20
    },
    dialog: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(227, 239, 239,0.9)",
    },
    dialog_container: {
        position: "absolute",
        top: "30%",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0C9B99",
        backgroundColor: '#FFF',
        height: 200,
        width: "90%",
        elevation: 15,
        shadowOpacity: 0.2,
        shadowOffset: { height: 7 },
    },
    other: {
        backgroundColor: "#0C9B99",
        padding: 10,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        left: 20,
        elevation: 15,
        shadowOpacity: 0.2,
        shadowOffset: { height: 7 },
    },
    textInput: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#C7CECE",
        backgroundColor: "#FFF",
        padding: 10,
        width: "90%",
        color: "#0C9B99",
        fontFamily: "Montserrat-Regular"
    },
    validateButton: {
        flexDirection: "row",
        backgroundColor: "#0C9B99",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    dateButton: {
        fontFamily: "Montserrat-Medium",
        paddingLeft: 10,
        color: "#FFF"
    }
  })