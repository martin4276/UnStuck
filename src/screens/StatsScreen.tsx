import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../theme';
import { useAppStore } from '../context/store';
import { Flame, Trophy, Link, BarChart3, ChevronLeft } from 'lucide-react-native';

export const StatsScreen = ({ navigation }: any) => {
  const { score, streak, chainsBroken, history } = useAppStore();

  const totalCompleted = history.reduce((acc, curr) => acc + curr.completed, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Ta Progression</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsGrid}>
            <View style={styles.statCard}>
                <Flame color={Colors.accent} size={32} fill={Colors.accent} />
                <Text style={styles.statValue}>{streak}</Text>
                <Text style={styles.statLabel}>STREAK ACTUEL</Text>
            </View>
            <View style={styles.statCard}>
                <Trophy color="#FFD700" size={32} />
                <Text style={styles.statValue}>{score}</Text>
                <Text style={styles.statLabel}>SCORE TOTAL</Text>
            </View>
        </View>

        <View style={styles.bigCard}>
            <Link color={Colors.accent} size={28} style={{ marginBottom: 15 }} />
            <Text style={styles.bigValue}>{chainsBroken}</Text>
            <Text style={styles.bigLabel}>CHAINS BROKEN (Missions terminées)</Text>
        </View>

        <View style={styles.chartSection}>
            <View style={styles.sectionHeader}>
                <BarChart3 color="white" size={20} />
                <Text style={styles.sectionTitle}>7 DERNIERS JOURS</Text>
            </View>
            
            <View style={styles.barChart}>
                {/* Simulation de graphique pour le MVP */}
                {[0.2, 0.5, 0.8, 0.3, 0.9, 0.4, 1].map((h, i) => (
                    <View key={i} style={styles.barWrapper}>
                        <View style={[styles.bar, { height: h * 100 }]} />
                        <Text style={styles.dayLabel}>J{i+1}</Text>
                    </View>
                ))}
            </View>
        </View>

        <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.premiumText}>DÉBLOQUER LES RAPPORTS PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.l, borderBottomWidth: 1, borderBottomColor: Colors.neutralDark },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  title: { ...Typography.h2, fontSize: 20, letterSpacing: 1 },
  scroll: { padding: Spacing.l },
  statsGrid: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  statCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 24, padding: 20, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '900', color: 'white', marginTop: 10 },
  statLabel: { fontSize: 10, color: Colors.neutralLight, fontWeight: 'bold', marginTop: 5 },
  bigCard: { backgroundColor: Colors.card, borderRadius: 32, padding: 30, alignItems: 'center', marginBottom: 20 },
  bigValue: { fontSize: 50, fontWeight: '900', color: 'white' },
  bigLabel: { fontSize: 12, color: Colors.accent, fontWeight: '900', letterSpacing: 1, marginTop: 5 },
  chartSection: { backgroundColor: Colors.card, borderRadius: 32, padding: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 25 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: Colors.neutralLight, letterSpacing: 1 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 120, paddingHorizontal: 10 },
  barWrapper: { alignItems: 'center', gap: 8 },
  bar: { width: 12, backgroundColor: Colors.accent, borderRadius: 6 },
  dayLabel: { fontSize: 8, color: Colors.neutralDark, fontWeight: 'bold' },
  premiumButton: { marginTop: 30, height: 60, borderRadius: 20, borderWidth: 1, borderColor: Colors.accent, justifyContent: 'center', alignItems: 'center' },
  premiumText: { color: Colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1 }
});
