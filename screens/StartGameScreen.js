import React, { useEffect, useState } from 'react';
import { 
    View ,
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert, 
    Dimensions, 
    ScrollView,
    KeyboardAvoidingView 
} from 'react-native';

import Card from '../components/Card';
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed ] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.addEventListener('change', updateLayout);
        };
    });

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
                <MainButton onPress={() => props.onStartGame(selectedNumber)} >
                    START GAME!
                </MainButton>
        </Card>
    }

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} >
        <View style = {styles.screen} >
            <Text style = {styles.title} >The Start Game Screen</Text> 
            <Card style ={styles.inputContainer} >
                <Text>Select a Number</Text>
                <Input 
                    style = {styles.input} 
                    blurOnSubmit 
                    autoCapitalize = 'none' 
                    autoCorrect ={false} 
                    keyboardType = "number-pad" 
                    maxLength ={2}
                    onChangeText = {numberHandler}
                    value = {enteredValue}
                />
                <View style = {styles.buttonContainer} >
                    <View style={{width: buttonWidth}}>
                        <Button 
                            title = 'reset' 
                            onPress={resetInputHandler} 
                            color = {colors.accent} 
                        />
                    </View>
                    <View style={{width: buttonWidth}}>
                        <Button title = 'confirm' onPress={confirmInputHandler} color = {colors.primary} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
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
        // width : 300,
        width : '80%',      // set to make responsive design
        minWidth : 300 ,
        maxWidth : '95%',
        // maxWidth : '80%',
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

    // button : {
    //     // width : 100
    //     width: Dimensions.get('window').width / 4 // we can get "window width" of device to make responsive for all device
    // }
});
export default StartGameScreen;