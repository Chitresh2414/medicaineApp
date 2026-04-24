import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming Expo
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

const SecurityFeature = ({ icon, title, description }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={icon} size={28} color={COLORS.primary} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
);

const PrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Data & Privacy</Text>
          <Text style={styles.subtitle}>
            Your health data is sensitive. Here is how we keep it safe and private.
          </Text>
        </View>

        <View style={styles.section}>
          <SecurityFeature 
            icon="shield-lock-outline"
            title="End-to-End Encryption"
            description="All medicine and health records are encrypted before being sent to our servers."
          />
          <SecurityFeature 
            icon="cloud-off-outline"
            title="Local First"
            description="Basic data stays on your device. We only sync what is necessary for backups."
          />
          <SecurityFeature 
            icon="account-check-outline"
            title="No Data Selling"
            description="We never sell your personal or health information to third-party advertisers."
          />
          <SecurityFeature 
            icon="database-sync-outline"
            title="MongoDB Security"
            description="Your data is stored in secure clusters with IP whitelisting and VPC peering."
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            By using this app, you agree to our Terms of Service. We use industry-standard 
            Bcrypt hashing for your passwords and JWT for session management.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>I Understand</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.l },
  header: { marginBottom: SPACING.xl },
  title: { ...FONTS.bold, fontSize: 28, color: COLORS.primaryDark },
  subtitle: { ...FONTS.regular, fontSize: 16, color: COLORS.textSub, marginTop: 8 },
  section: { marginBottom: SPACING.l },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 16,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  textContainer: { flex: 1 },
  cardTitle: { ...FONTS.bold, fontSize: 16, color: COLORS.primaryDark },
  cardDescription: { ...FONTS.regular, fontSize: 14, color: COLORS.textSub, marginTop: 4 },
  infoBox: {
    padding: SPACING.m,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: { ...FONTS.regular, fontSize: 13, color: COLORS.textSub, lineHeight: 20 },
  backButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  backButtonText: { ...FONTS.bold, color: COLORS.white, fontSize: 16 },
});

export default PrivacyScreen;