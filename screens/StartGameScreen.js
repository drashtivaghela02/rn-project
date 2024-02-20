import React, { useState } from 'react';
import { View , Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed ] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    
    const numberHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        let chosenNumber = parseInt(enteredValue);

        if(isNaN(chosenNumber) || chosenNumber <= 0  || chosenNumber > 99){
            Alert.alert(
                'Invalid number!', 
                'Number has to be a number betwen 1 to 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    };

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = 
        <Card style = {styles.summaryContainer} >
            <Text>You selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title = "START GAME!" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
    }

    return (
        <View style = {styles.screen} >
            <Text style = {styles.title} >The Start Game Screen</Text> 
            <Card style ={styles.inputContainer} >
                <Text>Select a Number</Text>
                <Input style = {styles.input} 
                    blurOnSubmit 
                    autoCapitalize = 'none' 
                    autoCorrect ={false} 
                    keyboardType = "number-pad" 
                    maxLength ={2}
                    onChangeText = {numberHandler}
                    value = {enteredValue}
                />
                <View style = {styles.buttonContainer} >
                    <View style = {styles.button} >
                        <Button title = 'reset' onPress={resetInputHandler} color = {colors.accent} />
                    </View>
                    <View style = {styles.button} >
                        <Button title = 'confirm' onPress={confirmInputHandler} color = {colors.primary} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    );
};

const styles = StyleSheet.create({
    screen :{
        flex : 1,
        paddind : 10,
        alignItems : 'center'
    },
    title : {
        fontSize : 20,
        marginVertical: 10
    },
    inputContainer : {
        width : 300,
        maxWidth : '80%',
        alignItems: 'center',
        
    },

    summaryContainer: {
        marginTop: 20, 
        alignItems : 'center'
    },

    input : {
        width : 60,  // It generates constant space width
        textAlign : 'center'
    },

    buttonContainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent: 'space-between',
        paddingHorizontal : '15'
    }, 

    button : {
        width : 100
    }
});
export default StartGameScreen;