import {createContext, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';

export interface Task{
    id: string;
    body: string; 
}

export const taskListContext = createContext<Task[] | undefined>(undefined);

export function appendTaskList({task}:{task: Task}){
    
}

export function deleteTaskList({task}:{task: Task}){

}


export default function TaskBar(){
    const [taskList, setTaskList] = useState<Task[]>([
        { id: '1', body: 'Complete homework' },
        { id: '2', body: 'Buy groceries' }
    ]);

    const renderItem = ({ item }: { item: Task }) => (
        <View style={{ marginVertical: 10 }}>
            <SingleTask task = {item}/>
        </View>
    );

    return (
        <taskListContext.Provider value={taskList}>
            <FlatList
                data={taskList} 
                renderItem={renderItem}
                // keyExtractor={item => item}
                contentContainerStyle={{alignItems: "stretch"}}
            />
        </taskListContext.Provider>
    );
}

function SingleTask({ task }: { task: Task }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ width: 500, height: 70, backgroundColor: '#333', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{task.body}</Text>
                <Button
                    onPress={() => deleteTask({ task })}
                    title='Mark as Completed.'
                    color='green'
                />
            </View>
        </View>
    );
}

function deleteTask({task}: {task:Task}){

}