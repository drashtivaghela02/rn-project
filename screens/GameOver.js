import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = props => {
    return(
        <ScrollView>
        <View style= {styles.screen} >
            <Text style ={styles.title} >The Game is Over!!</Text>
            <View style = {styles.imageContainer} >
                <Image 
                    fadeDuration={1000}  // while getting image from web we could set it because sometimes it can take time to load
                    //source={require('../assets/success.png')} 
                    source={{uri : 'https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8='}}
                    style= {styles.image} // for local image no need to give height & width
                    resizeMode='cover' />
            </View>
            <View style = {styles.resultContainer}>
            <Text style = {styles.fonts} >Your phone needed  
                <Text style ={styles.highlight} > {props.roundNum}</Text> rounds to guess the Number 
                <Text style ={styles.highlight} > {props.userNum}</Text>
            </Text>
            </View>
            <MainButton onPress = {props.onRestart} >
                NEW GAME
            </MainButton>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingVertical : '10',
    },
    fonts : {
        fontWeight : 'bold',
        marginVertical : 15,
        // width : '70%',
        textAlign: 'center',
        fontSize : 20 
        // fontSize : Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        color : colors.primary
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    imageContainer : {
        // width : 300,
        // height: 300,
        width : Dimensions.get('window').width * 0.7,
        height : Dimensions.get('window').width * 0.7 ,
        // borderRadius : 150,
        borderRadius : Dimensions.get('window').width * 0.35,
        borderWidth : 3,
        borderColor : 'black',
        overflow: 'hidden',
        // marginVertical: 30
        marginVertical: Dimensions.get('window').width / 30
    },
    resultContainer : {
        marginHorizontal : 30 ,
        marginVertical : Dimensions.get('window').height / 60
    },
    image : {
        width : '100%',
        height : '100%'
    }
});

export default GameOver;