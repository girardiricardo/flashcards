import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyQuiz() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Sorry, you cannot take a quiz because there are no cards in the deck.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    width: '90%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
})
