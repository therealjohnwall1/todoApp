import { Dimensions, StyleSheet, Text, View, Button, Modal } from 'react-native';
import React, { useContext, useState} from 'react';

// custom components
import AddButt from './AddButton';
import TaskBar from './taskList'
import LoginPage from './LoginPage';

//use context if more layers in app

export default function App() {
  //if innit task true, then text will prompt user to enter tasks


  const [tasks, setTasks] = useState<string[]>(["deez nuts", "hello world", "gogogogogo"]);

  const [displayLoginPage, setdisplayLoginPage] = useState(true);
  
    return (
      // adding the login page first
    <View style={styles.mainContainer}>
      {/* add modal when login requests are ready */}
       {/* <Modal
        visible = {displayLoginPage}
        onRequestClose={() => {
          console.log('User has logged in ');
          setdisplayLoginPage(!displayLoginPage);
        }}>
        <LoginPage setIsLoggedIn={setdisplayLoginPage}/>
      </Modal> */}

        {tasks.length === 0 && <Text>Start adding to your todolist!</Text>}
        <View style = {styles.taskContainer}>
        <TaskBar taskList = {tasks} onUpdateTasks = {setTasks} />
        </View>
        
        <View style = {styles.controlPanel}>
          <AddButt taskList = {tasks} onUpdateTasks = {setTasks}/>
        </View>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%', // Modify this line
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  taskContainer: {
    backgroundColor: 'grey',
  },
  controlPanel: {
    // width: '100%',
    // height: screenHeight * 0.1,
    backgroundColor: 'black',
    alignItems: 'center'
  }
});
