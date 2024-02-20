import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import colors from '../constants/colors';

const NumberContainer = props => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.number} >{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        borderWidth: 2,
        borderRadius : 10,
        borderColor : colors.accent,
        marginVertical : 10,
        padding : 10,
        alignItem: 'center',
        justifyContent : 'center'
    },

    number : {
        color : colors.accent, 
        fontSize : 22
    }
});

export default NumberContainer;