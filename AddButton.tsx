import React, { useState } from 'react';
import { StyleSheet, View,Button, Modal, Text, TextInput } from 'react-native';


export default function AddButt({taskList, onUpdateTasks}:{taskList: string[], onUpdateTasks(newTasks: string[]): void}) {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const handleButtonPress = () =>{
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const addTask = (taskToAdd: string) => {
        const updatedTaskList = [...taskList, taskToAdd];
        console.log("new tasklist = " + updatedTaskList);
        // const newTaskList = taskList.push(taskToAdd)
        onUpdateTasks(updatedTaskList);
    };

    //for text currently in the <TextInput>
    const [taskText, setTaskText] = useState('');

    const handleTaskTextChange = (text: string) => {
        setTaskText(text);
    };

    const handleAddTask = () => {
        addTask(taskText);
        console.log("Task added, " + taskText);
        setTaskText('');
        console.log("all tasks: " + {taskList});
        handleCloseModal();
    };

    return (
        <View style={styles.addButton}>
            <Button title={"Add Task"} color='white' onPress={handleButtonPress} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.textInput}> Add a New Task</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter task"
                        value={taskText}
                        onChangeText={handleTaskTextChange}
                        onSubmitEditing={handleAddTask}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Add" onPress={handleAddTask} />
                        <Button title="Cancel" color='red' onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

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