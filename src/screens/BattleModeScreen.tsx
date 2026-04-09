import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Swords } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const BattleModeScreen = ({ route, navigation }: any) => {
  const { tasks } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [progress] = useState(new Animated.Value(1));

  const selectTask = (task: any) => {
    // Dans ce prototype simplifié, la dernière tâche choisie devient THE ONE
    setWinner(task.text);
    setTimeout(() => {
        navigation.navigate('Focus', { taskName: task.text });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quelle tâche first ?</Text>
      </View>

      <View style={styles.battleField}>
        <TouchableOpacity style={styles.taskCard} onPress={() => selectTask(tasks[0])}>
          <Text style={styles.taskText}>{tasks[0].text}</Text>
        </TouchableOpacity>

        <View style={styles.vsCircle}>
          <Swords color={Colors.accent} size={32} />
          <Text style={styles.vsText}>VS</Text>
        </View>

        <TouchableOpacity style={[styles.taskCard, styles.secondCard]} onPress={() => selectTask(tasks[1])}>
          <Text style={styles.taskText}>{tasks[1].text}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.timerText}>DÉCIDE-TOI !</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.l },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { ...Typography.h1, fontSize: 28 },
  battleField: { flex: 1, justifyContent: 'space-around', alignItems: 'center' },
  taskCard: { width: '100%', height: 180, backgroundColor: Colors.card, borderRadius: 24, justifyContent: 'center', alignItems: 'center', padding: 20, borderWidth: 2, borderColor: 'transparent' },
  secondCard: { backgroundColor: Colors.neutralDark },
  taskText: { ...Typography.h2, textAlign: 'center' },
  vsCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.background, borderWidth: 3, borderColor: Colors.accent, justifyContent: 'center', alignItems: 'center', zIndex: 10, marginVertical: -40 },
  vsText: { color: Colors.accent, fontWeight: '900', fontSize: 14 },
  footer: { alignItems: 'center', marginTop: 40 },
  timerText: { ...Typography.button, color: Colors.accent, letterSpacing: 4 }
});
