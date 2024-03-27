import React, {useState} from 'react';
import {View, TextInput,Text, StyleSheet} from 'react-native';

export default function InpBox({ input, taskList }: { input: string, taskList : String[] }) {
    const [inputValue, setInputValue] = useState('');

    const [taskAdded, setTaskAdded] = useState(false);

    const handleInputChange = () => {
        setInputValue(inputValue);
        sendToBack(inputValue);
        setTaskAdded(true);
        taskList.push(inputValue);
    };

    function sendToBack(sendInput: string) {
        //send to backend
    };

    return (
        <View style={styles.inpBox}>
            <TextInput value={inputValue}
            placeholder= 'Enter Input'
            onSubmitEditing = {handleInputChange}
            />
        </View>
    );
}

export function DelBox({taskList} : {taskList : String[]}){

}


const styles = StyleSheet.create({
    inpBox:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 200,
        width: 300
    }
})