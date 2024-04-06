import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useState} from 'react';

// custom components
import AddButt from './AddButton';
import TaskBar from './taskList'

//use context if more layers in app

export default function App() {
  //if innit task true, then text will prompt user to enter tasks

  const [tasks, setTasks] = useState<string[]>(["Hello world", "deez nuts", "djksajdlksjdksjd", "ksajdkasjkj"]);
  
    return (
    <View style={styles.mainContainer}>
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
