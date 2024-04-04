import {createContext, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';

export interface Task{
    id: string;
    body: string; 
}

// export const taskListContext = createContext<Task[] | undefined>(undefined);
export const taskListContext = createContext<{
    tasks: Task[] | undefined;
    addTask: (newTask: Task) => void;
  } | undefined>(undefined);

  const TaskProvider = ({toAdd}:{toAdd: Task}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    const addTask = (newTask: Task) => {
      setTasks([...tasks, newTask]); // Add new task to the array
    };
  
    return (
      <taskListContext.Provider value={{ tasks, addTask }}>
        toAdd
      </taskListContext.Provider>
    );
  };


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
        <taskListContext.Provider value={{ tasks: taskList, addTask: () => {} }}>
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