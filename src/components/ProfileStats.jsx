import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ProfileStats = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { ...FONTS.bold, fontSize: 20, color: COLORS.primaryDark },
  statLabel: { ...FONTS.regular, fontSize: 12, color: COLORS.textSub, marginTop: 4 },
});

export default ProfileStats;