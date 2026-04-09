import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { Plus, Trash2, ShieldAlert } from 'lucide-react-native';

export const DailySetupScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<{id: string, text: string}[]>([]);
  const [inputText, setInputText] = useState('');

  const addTask = () => {
    if (inputText.trim() && tasks.length < 3) {
      setTasks([...tasks, { id: Date.now().toString(), text: inputText.trim() }]);
      setInputText('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Quoi aujourd'hui ?</Text>
          <Text style={styles.subtitle}>Choisis 3 missions cruciales.</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Écrire une tâche..."
            placeholderTextColor={Colors.neutralLight}
            value={inputText}
            onChangeText={setInputText}
            maxLength={50}
          />
          <TouchableOpacity 
            style={[styles.addButton, tasks.length >= 3 && styles.disabledButton]} 
            onPress={addTask}
            disabled={tasks.length >= 3}
          >
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.text}</Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Trash2 color={Colors.neutralLight} size={20} />
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.battleButton, tasks.length < 2 && styles.disabledButton]}
            onPress={() => navigation.navigate('Battle', { tasks })}
            disabled={tasks.length < 2}
          >
            <ShieldAlert color="white" size={24} style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>BATTLE MODE</Text>
          </TouchableOpacity>
          {tasks.length < 2 && (
            <Text style={styles.hint}>Ajoute au moins 2 tâches pour prioriser.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: Spacing.l },
  header: { marginBottom: Spacing.xl },
  title: { ...Typography.h1, marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, color: Colors.neutralLight },
  inputSection: { flexDirection: 'row', gap: 10, marginBottom: Spacing.l },
  input: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, padding: 15, color: 'white', fontSize: 16, borderBottomWidth: 2, borderBottomColor: Colors.neutralDark },
  addButton: { width: 55, height: 55, backgroundColor: Colors.accent, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  list: { flex: 1 },
  taskCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.card, padding: 20, borderRadius: 16, marginBottom: 10 },
  taskText: { ...Typography.body, flex: 1 },
  footer: { marginTop: 20, alignItems: 'center' },
  battleButton: { width: '100%', height: 60, backgroundColor: Colors.accent, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: Colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  buttonText: { ...Typography.button, color: 'white', fontWeight: '900' },
  disabledButton: { backgroundColor: Colors.neutralDark, opacity: 0.5 },
  hint: { color: Colors.neutralLight, marginTop: 10, fontSize: 12 }
});
