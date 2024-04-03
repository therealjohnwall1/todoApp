import {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import {taskListContext} from './context';

export interface Task{
    id: string;
    body: string; 
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
            <View style={{ width: 200, height: 50, backgroundColor: 'lightgray', justifyContent: 'center', paddingLeft: 10 }}>
                <Text>{task.body}</Text>
                
            </View>
        </View>
    );
}