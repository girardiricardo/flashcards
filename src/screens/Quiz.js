import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { clearLocalNotifications, setNotification } from '../utils/notification';

export default function Quiz ({ route, navigation }) {
  const { deck } = route.params;
  const { id, title, questions } = deck;

  const [index, setIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  
  const emptyQuestions = index === questions.length;

  const handleReply = (answer) => {
    if (answer === 'correct') {
      setCorrectAnswers(correctAnswers + 1);
    }

    setShowAnswer(false);
    setIndex(index + 1);
  }
  
  const handleRestart = () => {
    setIndex(0);
    setCorrectAnswers(0);
  }

  if (emptyQuestions) {
    clearLocalNotifications();
    setNotification();
  }

  return (
    <View style={styles.container}>
      {!emptyQuestions ? (
        <>
          <Text style={styles.header}>Card {index + 1} / {questions.length}</Text>

          <Text style={styles.questionHeader}>Question:</Text>
          <Text style={styles.questionText}>{questions[index].question}?</Text>

          {showAnswer ? (
            <>
              <Text style={styles.questionHeader}>Answer:</Text>
              <Text style={styles.questionText}>{questions[index].answer}</Text>
            </>
            ) : null
          }

          {!showAnswer && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowAnswer(true)}
            >
              <Text style={styles.buttonText}>Show answer</Text>
            </TouchableOpacity>
          )}

          {showAnswer && (
            <>
              <Text style={styles.questionHeader}>How did you do?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReply('correct')}
              >
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReply('incorrect')}
              >
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.questionHeader}>Score: {correctAnswers} of {questions.length}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRestart()}
          >
            <Text style={styles.buttonText}>Restart quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to deck</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '90%'
  },
  questionText: {
    width: '90%',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 15
  },
  button: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})