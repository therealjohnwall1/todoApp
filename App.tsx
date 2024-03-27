import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// custom components
import AddButt from './AddButton';
import InpBox from './editBox';

type taskEmpty = {
  empty: boolean;
};

const initialTaskEmpty: taskEmpty = {
  empty: true,
};


export default function App() {
      //if innit task true, then text will prompt user to enter tasks
  return ( 
    <View style={styles.taskContainer}>
      {initialTaskEmpty.empty && <Text>Start adding to your todolist!</Text>}
      <AddButt title="Add Tasks" />


      <InpBox input = "" taskList ={[]}/>

    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    height: '50%', // Modify this line
    flex: 4,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10
  },
});
