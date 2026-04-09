import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Plus, Trash2, Swords, Flame, Trophy } from 'lucide-react-native';
import { useAppStore } from '../../context/store';

export const DailySetupScreen = ({ navigation }: any) => {
  const { tasks, addTask, removeTask, streak, score } = useAppStore();
  const [inputText, setInputText] = useState('');

  const handleAddTask = () => {
    if (inputText.trim() && tasks.length < 3) {
      addTask(inputText.trim());
      setInputText('');
    } else if (tasks.length >= 3) {
      Alert.alert("Limite atteinte", "UnStuck se concentre sur l'essentiel. Maximum 3 tâches.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
            <View style={styles.stat}>
                <Flame color={Colors.accent} size={20} fill={streak > 0 ? Colors.accent : 'transparent'} />
                <Text style={styles.statText}>{streak}</Text>
            </View>
            <View style={styles.stat}>
                <Trophy color="#FFD700" size={20} />
                <Text style={styles.statText}>{score}</Text>
            </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Quoi aujourd'hui ?</Text>
          <Text style={styles.subtitle}>Pas de listes infinies. Juste le vital.</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Ta mission..."
            placeholderTextColor={Colors.neutralLight}
            value={inputText}
            onChangeText={setInputText}
            maxLength={50}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity 
            style={[styles.addButton, (tasks.length >= 3 || !inputText.trim()) && styles.disabledAdd]} 
            onPress={handleAddTask}
            disabled={tasks.length >= 3}
          >
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
            {tasks.map((item) => (
                <View key={item.id} style={styles.taskCard}>
                <Text style={styles.taskText}>{item.text}</Text>
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                    <Trash2 color={Colors.neutralDark} size={20} />
                </TouchableOpacity>
                </View>
            ))}
            {tasks.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Ton arène est vide.</Text>
                </View>
            )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.battleButton, tasks.length < 2 && styles.disabledButton]}
            onPress={() => navigation.navigate('Battle')}
            disabled={tasks.length < 2}
          >
            <Swords color="white" size={28} style={{ marginRight: 15 }} />
            <Text style={styles.buttonText}>BATTLE MODE</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>
            {tasks.length < 2 ? "Ajoute 2 tâches pour débloquer le duel." : "Il est temps de trancher."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: Spacing.l },
  statsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginBottom: 20 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.card, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  header: { marginBottom: Spacing.xl },
  title: { ...Typography.h1, fontSize: 36, letterSpacing: -1 },
  subtitle: { ...Typography.body, color: Colors.neutralLight, marginTop: 5 },
  inputSection: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  input: { flex: 1, backgroundColor: Colors.card, borderRadius: 16, padding: 18, color: 'white', fontSize: 16, borderWidth: 1, borderColor: Colors.neutralDark },
  addButton: { width: 60, height: 60, backgroundColor: Colors.accent, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  disabledAdd: { opacity: 0.3 },
  listContainer: { flex: 1 },
  taskCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.card, padding: 22, borderRadius: 24, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: Colors.accent },
  taskText: { ...Typography.body, flex: 1, fontSize: 18, fontWeight: '600' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.2 },
  emptyText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  footer: { marginTop: 20, alignItems: 'center' },
  battleButton: { width: '100%', height: 70, backgroundColor: Colors.accent, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: Colors.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 15, elevation: 8 },
  buttonText: { color: 'white', fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  disabledButton: { backgroundColor: Colors.neutralDark, opacity: 0.5, shadowOpacity: 0 },
  hint: { color: Colors.neutralLight, marginTop: 15, fontSize: 13, fontWeight: '600' }
});
