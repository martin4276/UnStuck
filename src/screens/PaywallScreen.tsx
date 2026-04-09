import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../theme';
import { ShieldCheck, Zap, Lock, BarChart, ChevronLeft, X } from 'lucide-react-native';

export const PaywallScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <X color={Colors.neutralLight} size={24} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>DÉBLOQUE TON POTENTIEL</Text>
          <Text style={styles.subtitle}>Deviens un guerrier de la concentration.</Text>
        </View>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
                <Lock color={Colors.accent} size={24} />
            </View>
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Mode Strict Réel</Text>
                <Text style={styles.featureDesc}>Verrouillage total des autres applications. Impossible de s'échapper.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
                <BarChart color={Colors.accent} size={24} />
            </View>
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Statistiques Avancées</Text>
                <Text style={styles.featureDesc}>Analyse tes patterns sur 30 jours et reçois des rapports PDF.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
                <Zap color={Colors.accent} size={24} />
            </View>
            <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Zero Ads</Text>
                <Text style={styles.featureDesc}>Supprime toutes les publicités pour une immersion totale.</Text>
            </View>
          </View>
        </View>

        <View style={styles.pricingCard}>
            <Text style={styles.cardLabel}>OFFRE ILLIMITÉE</Text>
            <Text style={styles.price}>4.99€<Text style={styles.period}>/mois</Text></Text>
            <Text style={styles.trial}>7 jours d'essai gratuit. Annulable partout.</Text>
            
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>COMMENCER L'ESSAI GRATUIT</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.restoreButton}>
            <Text style={styles.restoreText}>RESTAURER L'ACHAT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  closeButton: { position: 'absolute', top: 60, right: 20, zIndex: 10, padding: 10 },
  scroll: { padding: Spacing.l, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 50 },
  title: { ...Typography.h1, fontSize: 24, textAlign: 'center', letterSpacing: 1 },
  subtitle: { ...Typography.body, color: Colors.neutralLight, marginTop: 10 },
  featureList: { gap: 30, marginBottom: 60 },
  featureItem: { flexDirection: 'row', gap: 20 },
  iconBox: { width: 50, height: 50, backgroundColor: Colors.card, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  featureContent: { flex: 1 },
  featureTitle: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  featureDesc: { color: Colors.neutralLight, fontSize: 13, marginTop: 4, lineHeight: 18 },
  pricingCard: { backgroundColor: Colors.card, padding: 30, borderRadius: 32, alignItems: 'center', borderWidth: 1, borderColor: Colors.accent },
  cardLabel: { color: Colors.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 10 },
  price: { fontSize: 40, fontWeight: '900', color: 'white' },
  period: { fontSize: 16, color: Colors.neutralLight },
  trial: { color: Colors.neutralLight, fontSize: 11, marginTop: 10 },
  buyButton: { width: '100%', height: 60, backgroundColor: Colors.accent, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 25 },
  buyText: { color: 'white', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  restoreButton: { marginTop: 30, alignItems: 'center' },
  restoreText: { color: Colors.neutralDark, fontSize: 12, fontWeight: 'bold', textDecorationLine: 'underline' }
});
