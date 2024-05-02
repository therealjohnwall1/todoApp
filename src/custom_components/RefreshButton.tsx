import {View, Button} from 'react-native'

export default function RefreshButton({onUpdateTasks}: {onUpdateTasks(newTasks: string[]): void}){


    RefreshResults = () => {
        const data = {
        
        }

        try{
            const response = await fetch(
                localHost,
                {
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

            const result = await response.json();
            console.log("Sent user info to backend", result);
        }

        catch (error) {
            console.error("Error sending:", error);
        }


    }





}