import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Button, Alert, Text, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

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

const randerList = (value, numOfRound) => (
    <View key={value} style ={styles.listItems} >
        <Text>#{numOfRound}</Text>
        <Text>{value}</Text>
    </View>
);

const GameScreen = props => {
    const intialGuess = generateRandomBetween(1,100, props.userChoice);
    const [ currentGuess, setCurrent ] = useState(intialGuess); // added guess
    //const [ currentGuess, setCurrent ] = useState(generateRandomBetween(1,100,props.userChoice));
    //const [round, setRound] = useState(0);
    const [pastGuess, setPastGuess] = useState([intialGuess]);  // added guesses
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

        useEffect(() => {
            if(currentGuess === userChoice){
                onGameOver(pastGuess.length);
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
        // setRound(curRound => curRound + 1);
        setPastGuess(curPastGuess => [nextNumber, ...curPastGuess]); //

    };


    return(
        <View style= {styles.screen} >
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <MainButton onPress={(nextGuessHandler.bind(this, 'lower'))} >
                    <AntDesign name="minus" size={24} color="white" />
                </MainButton>
                <MainButton onPress={(nextGuessHandler.bind(this, 'graeter'))} >
                    <AntDesign name="plus" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer} >
                <ScrollView contentContainerStyle={styles.list}>{pastGuess.map((guess, index )=> randerList(guess, pastGuess.length - index))}</ScrollView> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen : { 
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },
    listItems: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor : 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width :'60%'
    },
    listContainer:{
        flex : 1,
        width: '80%'
    },
    list : {
        flexGrow: 1,
        alignItems : 'center',
        justifyContent: 'flex-end'
    },

    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width : 300,
        maxWidth : '80%'
    }
});

export default GameScreen;

