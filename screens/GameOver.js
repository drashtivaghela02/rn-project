import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOver = props => {
    return(
        <View style= {styles.screen} >
            <Text>The game is Over!!</Text>
            <Text>Number rounds : {props.roundNum}</Text>
            <Text>Number was : {props.userNum}</Text>
            <Button title = "NEW GAME" onPress = {props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default GameOver;