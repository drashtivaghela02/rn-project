import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Button, Alert, Text, ScrollView, Dimensions } from 'react-native';
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
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeights] = useState(
        Dimensions.get('window').height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout= () =>{
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeights(Dimensions.get('window').height)
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.addEventListener('change', updateLayout);
        };
    });
    
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
                [{text: 'sorry', style : 'cancel'}
            ]);
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

    let listContainerStyle = styles.listContainer;

    if(availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig;
    }

    if(availableDeviceHeight < 500){
        return(
            <View style= {styles.screen} >
                <Text>Opponent's Guess</Text>
                
                <View style = {styles.controls}>
                    <MainButton onPress={(nextGuessHandler.bind(this, 'lower'))} >
                        <AntDesign name="minus" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={(nextGuessHandler.bind(this, 'graeter'))} >
                        <AntDesign name="plus" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer} >
                    <ScrollView contentContainerStyle={styles.list}>{pastGuess.map((guess, index )=> randerList(guess, pastGuess.length - index))}</ScrollView> 
                </View>
            </View>
        );    
    }

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
    controls : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems : 'center',
        width : '80%'
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
        width: '60%'
        // width: Dimensions.get('window').width < 200 ? '60%' : '80%'
    },
    listContainerBig : {
        flex: 1,
        width : '80%'
    },
    list : {
        flexGrow: 1,
        alignItems : 'center',
        justifyContent: 'flex-end'
    },

    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width : 300,
        maxWidth : '80%'
    }
});

export default GameScreen;

