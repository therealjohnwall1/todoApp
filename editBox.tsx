import React, {useState} from 'react';
import {View, TextInput,Text, StyleSheet} from 'react-native';



export default function inpBox({ input, taskList }: { input: string, taskList: String[] }) {
    const [inputValue, setInputValue] = useState('');
    
    const [taskAdded, setTaskAdded] = useState(false);

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    const submitInput = ()

    function sendToBack({sendInput}: { sendInput: string }) {
        //send to backend
    }

    return (
        <View style={styles.inpBox}>
            <TextInput value={inputValue} onChangeText={handleInputChange}
            onSubmitEditing={}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inpBox:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})