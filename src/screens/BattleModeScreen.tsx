import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Swords, Zap } from 'lucide-react-native';
import { useAppStore } from '../../context/store';

export const BattleModeScreen = ({ navigation }: any) => {
  const { tasks } = useAppStore();
  const [battleIndex, setBattleIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, number>>({});

  // Simuler un tournoi simple pour le MVP
  const handleVote = (taskId: string) => {
    navigation.navigate('Focus', { taskName: tasks.find(t => t.id === taskId)?.text });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressHeader}>
          <Text style={styles.headerLabel}>DÉCIDE-TOI</Text>
          <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
      </View>

      <View style={styles.battleField}>
        <TouchableOpacity 
            style={[styles.taskCard, styles.cardTop]} 
            onPress={() => handleVote(tasks[0].id)}
            activeOpacity={0.8}
        >
          <Zap color={Colors.accent} size={24} style={{marginBottom: 15}} />
          <Text style={styles.taskText}>{tasks[0].text}</Text>
        </TouchableOpacity>

        <View style={styles.vsContainer}>
          <View style={styles.vsLine} />
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.vsLine} />
        </View>

        <TouchableOpacity 
            style={[styles.taskCard, styles.cardBottom]} 
            onPress={() => handleVote(tasks[1].id)}
            activeOpacity={0.8}
        >
          <Text style={styles.taskText}>{tasks[1].text}</Text>
          <Zap color={Colors.accent} size={24} style={{marginTop: 15}} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Swords color={Colors.neutralDark} size={32} />
        <Text style={styles.footerText}>Laquelle est la plus CRUCIALE ?</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.l },
  progressHeader: { marginBottom: 40 },
  headerLabel: { color: Colors.accent, fontWeight: '900', fontSize: 12, letterSpacing: 2, marginBottom: 10, textAlign: 'center' },
  progressBar: { width: '100%', height: 4, backgroundColor: Colors.card, borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: Colors.accent, borderRadius: 2 },
  battleField: { flex: 1, justifyContent: 'center' },
  taskCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 32, justifyContent: 'center', alignItems: 'center', padding: 30, borderWidth: 1, borderColor: Colors.neutralDark },
  cardTop: { marginBottom: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
  cardBottom: { marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  taskText: { ...Typography.h2, textAlign: 'center', fontSize: 26, lineHeight: 34 },
  vsContainer: { flexDirection: 'row', alignItems: 'center', height: 60, zIndex: 10 },
  vsLine: { flex: 1, height: 1, backgroundColor: Colors.neutralDark },
  vsCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.accent, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  vsText: { color: 'white', fontWeight: '900', fontSize: 18, fontStyle: 'italic' },
  footer: { alignItems: 'center', marginTop: 30, gap: 10 },
  footerText: { color: Colors.neutralLight, fontWeight: '700', fontSize: 14 }
});
