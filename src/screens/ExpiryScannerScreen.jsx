import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  StatusBar, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

// Updated Theme & Components
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';

const ExpiryScannerScreen = () => {
  const navigation = useNavigation();
  
  // UI States
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null); // null | 'Safe' | 'Warning' | 'Expired'
  const [medicineData, setMedicineData] = useState({
    name: '',
    expiryDate: '',
    daysRemaining: 0
  });

  // Mock AI Scanning Function (To be replaced by Python FastAPI)
  const handleScanLabel = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!granted) {
      Alert.alert("Permission Denied", "We need camera access to scan the label.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.6,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setIsScanning(true);
      setScanResult(null);

      // Simulating API Call to Python Backend
      setTimeout(() => {
        // Mock Data: Pretend the AI found an expiring medicine
        const foundDate = "05/2026";
        const remaining = 35; // Days
        
        setMedicineData({
          name: "Scanned Medicine",
          expiryDate: foundDate,
          daysRemaining: remaining
        });

        // Determine Status based on days remaining
        if (remaining < 0) {
          setScanResult('Expired');
        } else if (remaining <= 60) {
          setScanResult('Warning');
        } else {
          setScanResult('Safe');
        }
        
        setIsScanning(false);
      }, 2000); // 2 second mock delay
    }
  };

  // Helper function to render the result card based on status
  const renderResultCard = () => {
    if (!scanResult) return null;

    let bgColor, iconName, iconColor, statusText, subText;

    switch (scanResult) {
      case 'Safe':
        bgColor = '#ECFDF5'; // Light Green
        iconColor = COLORS.success; // #10B981
        iconName = 'check-circle';
        statusText = 'Safe to Use';
        subText = `Expires in ${medicineData.daysRemaining} days`;
        break;
      case 'Warning':
        bgColor = '#FFFBEB'; // Light Yellow
        iconColor = COLORS.warning; // #F59E0B
        iconName = 'alert-triangle';
        statusText = 'Expiring Soon';
        subText = `Only ${medicineData.daysRemaining} days left!`;
        break;
      case 'Expired':
        bgColor = '#FEF2F2'; // Light Red
        iconColor = COLORS.error; // #EF4444
        iconName = 'x-circle';
        statusText = 'Expired!';
        subText = 'Do NOT consume this medicine.';
        break;
      default:
        return null;
    }

    return (
      <View style={[styles.resultCard, { backgroundColor: bgColor }, SHADOWS.medium]}>
        <Feather name={iconName} size={48} color={iconColor} />
        <CustomText fontWeight="bold" style={[styles.resultTitle, { color: iconColor }]}>
          {statusText}
        </CustomText>
        <CustomText style={styles.resultDetails}>
          Expiry Date: <CustomText fontWeight="bold">{medicineData.expiryDate}</CustomText>
        </CustomText>
        <CustomText style={styles.resultSubtext}>{subText}</CustomText>

        {scanResult === 'Warning' && (
          <TouchableOpacity 
            style={[styles.reminderBtn, { backgroundColor: iconColor }]}
            onPress={() => Alert.alert("Reminder Set", "We will notify you before it expires.")}
            activeOpacity={0.8}
          >
            <Feather name="bell" size={16} color={COLORS.white} />
            <CustomText fontWeight="bold" style={styles.reminderBtnText}>
              Set Replacement Reminder
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <CustomText fontWeight="bold" style={styles.headerTitle}>
          Expiry Scanner
        </CustomText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        
        {/* INSTRUCTIONS AREA */}
        {!isScanning && !scanResult && (
          <View style={styles.instructionArea}>
            <View style={[styles.iconCircle, SHADOWS.small]}>
              <MaterialCommunityIcons name="calendar-search" size={60} color={COLORS.primary} />
            </View>
            <CustomText fontWeight="bold" style={styles.instructionTitle}>
              Check Medicine Expiry
            </CustomText>
            <CustomText style={styles.instructionDesc}>
              Scan the back of your medicine strip or bottle. Our AI will find the "EXP" date and tell you if it's safe to use.
            </CustomText>
          </View>
        )}

        {/* LOADING STATE */}
        {isScanning && (
          <View style={styles.loadingArea}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <CustomText fontWeight="medium" style={styles.loadingText}>
              Analyzing label with AI...
            </CustomText>
            <CustomText style={styles.loadingSub}>
              Looking for dates and batch numbers
            </CustomText>
          </View>
        )}

        {/* RESULTS AREA */}
        {!isScanning && renderResultCard()}

      </View>

      {/* FIXED BOTTOM ACTION */}
      <View style={styles.bottomSection}>
        <CustomButton 
          title={scanResult ? "Scan Another Medicine" : "Open Camera to Scan"} 
          onPress={handleScanLabel}
          icon="camera"
          disabled={isScanning}
        />
      </View>

    </SafeAreaView>
  );
};

// Styles using the new Theme Constants
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.s,
    width: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  instructionArea: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight, // Using new Teal 100
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  instructionTitle: {
    fontSize: 22,
    color: COLORS.primaryDark,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  instructionDesc: {
    fontSize: 15,
    color: COLORS.textSub,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.m,
  },
  loadingArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: SPACING.l,
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  loadingSub: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSub,
  },
  resultCard: {
    padding: SPACING.xl,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  resultTitle: {
    fontSize: 24,
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  resultDetails: {
    fontSize: 16,
    color: COLORS.textMain,
    marginBottom: 4,
  },
  resultSubtext: {
    fontSize: 14,
    color: COLORS.textSub,
    marginBottom: SPACING.l,
  },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: SPACING.s,
  },
  reminderBtnText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: 14,
  },
  bottomSection: {
    padding: SPACING.l,
    paddingBottom: 40,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  }
});

export default ExpiryScannerScreen;