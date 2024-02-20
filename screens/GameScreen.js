import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Button, Alert, Text} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const [ currentGuess, setCurrent ] = useState(
        generateRandomBetween(1,100,props.userChoice)
    );
    const [round, setRound] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

        useEffect(() => {
            if(currentGuess === userChoice){
                onGameOver(round);
            }
        }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if(
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice) ){
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong ...',
                [{text: 'sorry', style : 'cancel'}]);
        return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrent(nextNumber);
        setRound(curRound => curRound + 1);
    };


    return(
        <View style= {styles.screen} >
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <Button title ="LOWER" onPress={(nextGuessHandler.bind(this, 'lower'))} />
                <Button title ="GREATER" onPress={(nextGuessHandler.bind(this, 'graeter'))} />
            </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    screen : { 
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },

    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width : 300,
        maxWidth : '80%'
    }
});

export default GameScreen;

