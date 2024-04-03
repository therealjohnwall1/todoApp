import React, { useContext } from 'react';
import { StyleSheet, View,Button } from 'react-native';
// import {taskList} from './App';


export default function AddButt({title}: {title: string}) {
    // const [tasks, setTasks] = useContext(taskList);
    
    function addTask(){
        
    }

    return (
        <View style={styles.addButton}>
            <Button
                title={title}
                color='black'
                onPress={addTask}
                // Style={{ fontWeight: 'bold' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',


        padding: 10,
        borderRadius: 5,
        width: 200,
        height: 70, 
    }
})