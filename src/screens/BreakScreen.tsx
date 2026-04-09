import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Coffee, FastForward, Timer } from 'lucide-react-native';

export const BreakScreen = ({ navigation }: any) => {
  const [seconds, setSeconds] = useState(5 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
        clearInterval(timer);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Coffee size={40} color={Colors.accent} />
        <Text style={styles.title}>PAUSE MÉRI-TÉE.</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <Text style={styles.timerLabel}>RECHARGE TES BATTERIES</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Daily')}>
          <FastForward color="white" size={24} />
          <Text style={styles.skipText}>SKIP LA PAUSE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.plusButton} onPress={() => setSeconds(s => s + 300)}>
          <Timer color={Colors.accent} size={24} />
          <Text style={styles.plusText}>+5 MIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.l, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 40, gap: 20 },
  title: { ...Typography.h1, fontSize: 32, textAlign: 'center' },
  timerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 120, fontWeight: '900', color: Colors.accent, letterSpacing: -5 },
  timerLabel: { color: Colors.neutralLight, fontSize: 10, fontWeight: 'bold', letterSpacing: 4, marginTop: 10 },
  footer: { gap: 15, marginBottom: 20 },
  skipButton: { height: 65, backgroundColor: Colors.neutralDark, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  skipText: { color: 'white', fontWeight: '900', fontSize: 16 },
  plusButton: { height: 65, borderRadius: 24, borderWidth: 2, borderColor: Colors.accent, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  plusText: { color: Colors.accent, fontWeight: '900', fontSize: 16 }
});
