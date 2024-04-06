import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useState} from 'react';

// custom components
import AddButt from './AddButton';
import InpBox from './editBox';
import TaskBar from './taskList'

//use context if more layers in app

export default function App() {
  //if innit task true, then text will prompt user to enter tasks

  const [tasks, setTasks] = useState<string[]>(["Hello world"]);
  
    return (
    <View style={styles.taskContainer}>
        {tasks.length === 0 && <Text>Start adding to your todolist!</Text>}

        <TaskBar taskList = {tasks} onUpdateTasks = {setTasks} />
        <View style = {styles.controlPanel}>
          <AddButt taskList = {tasks} onUpdateTasks = {setTasks}/>
        </View>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    height: '10%', // Modify this line
    flex: 4,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  controlPanel: {
    width: '100%',
    height: screenHeight * 0.15,
    backgroundColor: 'black',
    alignItems: 'center'
  }
});
