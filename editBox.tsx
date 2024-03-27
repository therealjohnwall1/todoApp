import React, {useState} from 'react';
import {View, TextInput,Text, StyleSheet} from 'react-native';

require('dotenv').config()


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
        let url = process.env.BACKEND_ROUTE || '';
        if (url) {
            let request = new XMLHttpRequest();
            request.open("GET", url);
            // Rest of your code...
        }
        else {
            console.error("Backend route is not defined");
        }

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