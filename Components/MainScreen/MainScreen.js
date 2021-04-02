import React from 'react'
import Header from '../header/Header'
import { StyleSheet, Dimensions, View, FlatList, Button, TextInput} from 'react-native'
import ListItem from '../ListItem/ListItem'
import * as Animatable from "react-native-animatable"
import AddButton from '../AddButton/AddButton'

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            counter: 1,
            isViewVisible: false
        }
    }

    handleModalRef = ref => this.modal = ref
    handleModalContainerRef = ref => this.modalContainer = ref

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
                            <TextInput style={styles.textInput} placeholder="Votre tâche"/>
                            <Button title="Cacher" onPress={() => {
                                this.modal.bounceOutDown().then(endstate => this.setState({
                                    isViewVisible: false
                                }))
                                this.modalContainer.fadeOut()
                             }}/>
                        </Animatable.View>
                    </Animatable.View>
                ) : null }
                    <AddButton 
                        function={this.handlePress}
                        animation="bounceInDown"
                        useNativeDriver={true}/>
            </View>
        )
    }

    handlePress = () => {
        this.setState({
            tasks: this.state.tasks.concat([{key: (this.state.counter + 1).toString(), text: "Nouvelle tache  " + this.state.counter}]),
            counter: this.state.counter + 1,
            isViewVisible: true
        })
    }

    deleteItemByKey = (key) => {
        const filteredTasks = this.state.tasks.filter(item => item.key !== key);
        this.setState({ 
            tasks: filteredTasks });
      }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
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
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20,
        backgroundColor: 'rgba(12, 155, 153, 1.0)',
        borderRadius: 10,
        height: 200,
        width: "70%",
        opacity: 1
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
        borderRadius: 4,
        backgroundColor: "#FFF",
        padding: 10,
        width: "90%"
    }
  })