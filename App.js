import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

export default function App() {

  const[userNumber, setUserNumber] = useState();
  const[guessRound, setGuessRound] = useState(0);

  const NewGameHander = () => {
    setGuessRound(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRound) => {
    setGuessRound(numOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} onRestart ={NewGameHander} />;
  if(userNumber && guessRound <= 0){
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      );
  } else if(guessRound > 0){
    content = (
      <GameOver roundNum={guessRound} userNum ={userNumber} onRestart={NewGameHander}  />
      );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title = "Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
