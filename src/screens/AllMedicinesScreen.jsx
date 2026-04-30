import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllUserMedicines, deleteMedicine } from '../api/medicineApi'; // API functions
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';
import CustomText from '../components/CustomText';

const AllMedicinesScreen = () => {
    const navigation = useNavigation();
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    // Backend se saari medicines load karne ka function[cite: 8, 13]
    const loadAllMedicines = async () => {
        try {
            setLoading(true);
            const res = await getAllUserMedicines(); 
            if (res && res.success) {
                setMedicines(res.medicines); // Backend key 'medicines' hai
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            Alert.alert("Error", "Medicines load nahi ho payi.");
        } finally {
            setLoading(false);
        }
    };

    // Screen focus hone par data refresh karein
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadAllMedicines();
        });
        return unsubscribe;
    }, [navigation]);

    const handleDelete = (id) => {
        Alert.alert("Delete", "Kya aap ise permanent delete karna chahte hain?", [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Delete", 
                style: "destructive", 
                onPress: async () => {
                    const res = await deleteMedicine(id); // Delete API call[cite: 8]
                    if(res.success) loadAllMedicines();
                } 
            }
        ]);
    };

    if (loading) return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={medicines}
                keyExtractor={(item) => item.id} // Backend serializer 'id' bhejta hai[cite: 6]
                ListEmptyComponent={<CustomText style={styles.empty}>No medicines found.</CustomText>}
                renderItem={({ item }) => (
                    <View style={[styles.card, SHADOWS.small]}>
                        <View style={styles.info}>
                            <CustomText style={styles.medName}>{item.name}</CustomText>
                            <Text style={styles.subText}>{item.type} • {item.dose}</Text>
                            
                            {/* Expiry Alert Logic (5 din pehle) */}
                            {item.expiry_alert && (
                                <Text style={styles.alertText}>⚠️ Expiring in {item.days_until_expiry} days!</Text>
                            )}
                        </View>

                        <View style={styles.actions}>
                            {/* Edit Button: AddMedicineScreen par data bhej raha hai[cite: 1, 8] */}
                            <TouchableOpacity 
                                style={styles.editBtn}
                                onPress={() => navigation.navigate('AddMedicine', { medicine: item })}
                            >
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.deleteBtn}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.btnText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 15 },
    loader: { flex: 1, justifyContent: 'center' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: COLORS.primaryDark },
    empty: { textAlign: 'center', marginTop: 50, color: COLORS.textSub },
    card: { 
        padding: 15, 
        backgroundColor: COLORS.white, 
        marginBottom: 12, 
        borderRadius: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    medName: { fontSize: 18, fontWeight: '700', color: COLORS.primaryDark },
    subText: { color: COLORS.textSub, marginTop: 4 },
    alertText: { color: COLORS.error, fontWeight: 'bold', marginTop: 5, fontSize: 12 },
    actions: { flexDirection: 'row' },
    editBtn: { backgroundColor: COLORS.secondary, padding: 8, borderRadius: 8, marginRight: 8 },
    deleteBtn: { backgroundColor: COLORS.error, padding: 8, borderRadius: 8 },
    btnText: { color: COLORS.white, fontWeight: 'bold' }
});

export default AllMedicinesScreen;