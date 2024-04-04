import React, { useContext, useState } from 'react';
import { StyleSheet, View,Button, Modal, Text, TextInput } from 'react-native';

import {taskListContext, Task} from './taskList';


export default function AddButt({title}: {title: string}) {
    
    const tasks = useContext(taskListContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const handleButtonPress = () =>{
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    function pushTask({task}: {task: Task}){
        if (tasks && tasks?.addTask){
            tasks.addTask(task);
        }
        
    }

    return (
        <View style={styles.addButton}>
            <Button title={title} color='white' onPress={handleButtonPress} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <Text style ={styles.textInput}> Add a New Task</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter task "
                            onSubmitEditing={pushTask}
                        />
                    <View style={styles.buttonContainer}>
                        {/* <Button title="Add" onPress={handleAddTask} /> */}
                        <Button title="Cancel" color='red' onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
    };

const styles = StyleSheet.create({
    addButton: {
        // ... button styles
    },
    modalContainer: {
        flex: 3, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'grey', 
        borderRadius: 10, 
    },
    textInput: {
        fontSize: 40, // Add the desired font size here
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        fontSize: 40,
    },
});