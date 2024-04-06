import {createContext, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';

interface singleTaskProps{
    task: string;
    onDelete(task: string) => void;
}

// export const taskListContext = createContext<Task[] | undefined>(undefined);

export default function TaskBar({taskList}: {taskList: string[]}){


    const handleDelete = (taskToDel: string) => {
        taskList= taskList.filter((task) => task !== taskToDelete);
    }

    const renderItem = ({ item }: { item: string }) => (
        <View style={{ marginVertical: 10 }}>
            <SingleTask task = {item}/>
        </View>
    );

    return (
        <View>
            <FlatList
                data={taskList} 
                renderItem={renderItem}
                // keyExtractor={item => item}
                contentContainerStyle={{alignItems: "stretch"}}
            />
        <View/>
        );
}

function SingleTask({task, onDelete}: singleTaskProps) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ width: 500, height: 70, backgroundColor: '#333', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{task}</Text>
                <Button
                    onPress={() => deleteTask(task)}
                    title='Mark as Completed.'
                    color='green'
                />
            </View>
        </View>
    );
}

function deleteTask({task}: {task: string}){



}