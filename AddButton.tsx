import React from 'react';
import { StyleSheet, View,Button } from 'react-native';

export default function AddButt({title}: {title: string}) {
    return (
        <View style={styles.addButton}>
            <Button
                title={title}
                color='black'
                // Style={{ fontWeight: 'bold' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',


        padding: 10,
        borderRadius: 5,
        width: 200,
        height: 70, 
    }
})