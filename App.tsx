import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {createContext, useContext, useState} from 'react';

// custom components
import AddButt from './AddButton';
import InpBox from './editBox';
import TaskBar from './taskList'

type taskEmpty = {
  empty: boolean;
};

const initialTaskEmpty: taskEmpty = {
  empty: true,
};

export default function App() {
  //if innit task true, then text will prompt user to enter tasks

  const [tasks, setTasks] = useState<string[]>([]);
  
  return (
    <View style={styles.taskContainer}>
        {initialTaskEmpty.empty && <Text>Start adding to your todolist!</Text>}
        <TaskBar/>
      
        {/* <InpBox input = "" taskList ={tasks}/> */}
        <View style = {styles.controlPanel}>
          <AddButt title="Add Tasks" />
        </View>
    </View>
  );
}

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
    height: '8%',
    backgroundColor: 'black',
    alignItems: 'center'
  }
});
