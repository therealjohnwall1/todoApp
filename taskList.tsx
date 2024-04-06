import {View, Text, FlatList, Button} from 'react-native';

interface singleTaskProps{
    task: string;
    handleDelete(task: string) : void;
}

export default function TaskBar({taskList, onUpdateTasks}: {taskList: string[], onUpdateTasks(newTasks: string[]): void}) {

    const handleDelete = (taskToDel: string) => {
        newTaskList = taskList.filter((task) => task !== taskToDel);
        onUpdateTasks(newTaskList);
    }

    const renderItem = ({ item }: { item: string }) => {
        <View style={{ marginVertical: 10 }}>
            <SingleTask task = {item} onDelete = {handleDelete}/>
        </View>
    }

    function SingleTask({task, onDelete}: singleTaskProps) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <View style={{ width: 500, height: 70, backgroundColor: '#333', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>{task}</Text>
                    <Button
                        onPress=  {onDelete(task)}
                        title='Mark as Completed.'
                        color='green'
                    />
                </View>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={taskList} 
                renderItem={renderItem}
                // keyExtractor={item => item}
                contentContainerStyle={{alignItems: "stretch"}}
            />
        </View>
        );
}

