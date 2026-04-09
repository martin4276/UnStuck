import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Flame, Lock, AlertTriangle } from 'lucide-react-native';

export const FocusActiveScreen = ({ route, navigation }: any) => {
  const { taskName } = route.params;
  const [seconds, setSeconds] = useState(25 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusRow}>
        <View style={styles.badge}>
            <Lock size={14} color={Colors.accent} />
            <Text style={styles.badgeText}>MODE STRICT : ON</Text>
        </View>
        <Flame size={28} color={Colors.accent} fill={Colors.accent} />
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <View style={styles.progressCircle} />
      </View>

      <View style={styles.taskSection}>
        <Text style={styles.taskLabel}>EN COURS :</Text>
        <Text style={styles.taskName}>{taskName}</Text>
      </View>

      <TouchableOpacity 
        style={styles.panicButton} 
        onLongPress={() => navigation.navigate('Daily')}
      >
        <AlertTriangle color={Colors.neutralDark} size={20} />
        <Text style={styles.panicText}>MAINTENIR POUR ABANDONNER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.l, justifyContent: 'space-between' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF450020', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  badgeText: { color: Colors.accent, fontSize: 12, fontWeight: '900' },
  timerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 100, fontWeight: '900', color: 'white', letterSpacing: -2 },
  progressCircle: { position: 'absolute', width: 280, height: 280, borderRadius: 140, borderWidth: 8, borderColor: Colors.accent, borderTopColor: 'transparent', opacity: 0.3 },
  taskSection: { alignItems: 'center', backgroundColor: Colors.card, padding: 30, borderRadius: 30 },
  taskLabel: { color: Colors.neutralLight, fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  taskName: { ...Typography.h2, textAlign: 'center' },
  panicButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 10 },
  panicText: { color: Colors.neutralDark, fontSize: 12, fontWeight: 'bold' }
});
