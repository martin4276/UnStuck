import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Flame, Lock, ShieldAlert, Circle } from 'lucide-react-native';
import { useAppStore } from '../../context/store';

export const FocusActiveScreen = ({ route, navigation }: any) => {
  const { taskName } = route.params;
  const { incrementScore, resetStreak } = useAppStore();
  const [seconds, setSeconds] = useState(25 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
          if (s <= 1) {
              clearInterval(timer);
              handleComplete();
              return 0;
          }
          return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
      incrementScore();
      Alert.alert("VICTOIRE", "Session terminée. Score +10.", [
          { text: "ENCORE !", onPress: () => navigation.navigate('Daily') }
      ]);
  };

  const handlePanic = () => {
      Alert.alert(
          "ABANDON ?",
          "Tu vas perdre ton streak et ton honneur.",
          [
              { text: "NON, JE RESTE", style: "cancel" },
              { 
                text: "J'ABANDONNE", 
                style: "destructive", 
                onPress: () => {
                  resetStreak();
                  navigation.navigate('Daily');
                }
              }
          ]
      );
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.strictBadge}>
            <Lock size={14} color={Colors.accent} />
            <Text style={styles.strictText}>STRICT MODE: ACTIVE</Text>
        </View>
        <Flame size={28} color={Colors.accent} fill={Colors.accent} />
      </View>

      <View style={styles.timerZone}>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>RESTAURANT TA CONCENTRATION</Text>
      </View>

      <View style={styles.taskCard}>
        <Text style={styles.taskLabel}>FOCUS SUR :</Text>
        <Text style={styles.taskName}>{taskName}</Text>
      </View>

      <TouchableOpacity 
        style={styles.panicButton} 
        onLongPress={handlePanic}
        delayLongPress={2000}
      >
        <ShieldAlert color={Colors.neutralDark} size={24} />
        <Text style={styles.panicText}>MAINTENIR 2S POUR ABANDONNER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.l, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  strictBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF450015', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, gap: 8, borderWidth: 1, borderColor: '#FF450030' },
  strictText: { color: Colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  timerZone: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 110, fontWeight: '900', color: 'white', letterSpacing: -4, fontVariant: ['tabular-nums'] },
  timerLabel: { color: Colors.neutralLight, fontSize: 10, fontWeight: 'bold', letterSpacing: 3, marginTop: 10 },
  taskCard: { backgroundColor: Colors.card, padding: 35, borderRadius: 40, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 10 },
  taskLabel: { color: Colors.accent, fontSize: 12, fontWeight: '900', marginBottom: 15, letterSpacing: 2 },
  taskName: { ...Typography.h1, textAlign: 'center', fontSize: 28 },
  panicButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 30, gap: 12 },
  panicText: { color: Colors.neutralDark, fontSize: 11, fontWeight: '800', letterSpacing: 1 }
});
