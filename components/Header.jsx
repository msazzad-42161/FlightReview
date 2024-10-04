import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, STATUSBAR_HEIGHT, THEME } from '../const/const';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Business & First Class Reviews</Text>
            <TouchableOpacity>
                <Ionicons name="menu" size={THEME.sizes.large} color={THEME.colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: STATUSBAR_HEIGHT + SPACING.md,  // To accommodate the status bar height
        padding: SPACING.md,  // Large padding based on the spacing guideline
        backgroundColor: '#fff',  // Background color from theme
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: THEME.sizes.header,  // Use the header size from theme
        color: THEME.colors.primary,  // Text color from theme
        fontWeight:'500'
    },
});
