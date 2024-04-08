import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, {useRef, useState} from 'react';

// temp for now, move to env later
const BACKEND_ROUTE="10.3.0.14"
const local_host = "http://127.0.0.1:8000/"

export default function LoginPage(){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleNextField = (nextFieldRef: any) => {
        if (nextFieldRef) {
          nextFieldRef.current.focus();
        }
    };

    // if makeNewAccount is 0 -> create user
    // else login existing user

    const sendUserInfo = (makeNewAccount: number) =>{
        const req = new XMLHttpRequest();
        req.open('PUT', local_host + "edit_user" + makeNewAccount, true)
        req.setRequestHeader('Content-Type', 'application/json');
        const jsonData = {
            name: username,
            password: password
        }
        const body = JSON.stringify(jsonData)
        req.send(body)

        req.onload = () => {
            if(req.status === 200){
                const response = JSON.parse(req.responseText)
                console.log(response)
            }
            else{
                console.error("Request failed status code: ", req.status);
            }
        }
    }

    return(
        <View style={styles.LoginPage}>
            <View>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={handleUsernameChange}
                    onSubmitEditing={()=>handleNextField(passwordRef)}
                />
            </View>

            <View>
           <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    onSubmitEditing={() => handleNextField(null)}
                />
            </View>
            
            <View>
                <Button title="Login" onPress={() => sendUserInfo(0)} />
            </View>

            <View>
                <Button title="Make New Account" onPress={() => sendUserInfo(1)} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    LoginPage:{
        flexDirection: 'column',


    }
})