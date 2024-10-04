import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SPACING, THEME } from '../const/const';
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
const DURATION = 100
const FlightClassAccordion = ({ fullView, setFullView, selectedClass, setSelectedClass }) => {
    const toggleView = useCallback(() => {
        setFullView(prevView => !prevView);
    }, []);

    const height = useSharedValue(0);  // Shared value to track the height

    // Use derived value to control the animated height based on the fullView state
    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(fullView), {
          duration:DURATION,
        })
      );

    const animatedStyle = useAnimatedStyle(() => {
        return {
        overflow: 'hidden',
            height: derivedHeight.value,
        };
    });

    return (
        <View>
            {/* Accordion Header */}
            <Pressable onPress={toggleView} style={styles.header}>
                <Text style={[styles.headertext, selectedClass ? { color: THEME.colors.text } : null]}>
                    {selectedClass ? selectedClass : 'Class'}
                </Text>
                <Entypo name={fullView ? 'chevron-small-up' : 'chevron-small-down'} size={24} color={THEME.colors.text} />
            </Pressable>

            {/* Accordion Body with Toggle Animation */}
            <Animated.View style={[animatedStyle]}>
                <View
                    style={styles.childrenContainer}
                    onLayout={(event) => height.value = event.nativeEvent.layout.height} // Capture content height dynamically
                >
                    {['Any', 'Business', 'First', 'Premium Economy', 'Economy'].map((item, index) => (
                        <TouchableOpacity
                            key={index.toString()}
                            style={[
                                styles.dropdownItem,
                                selectedClass === item || (item === 'Any' && selectedClass === '') ? styles.activeDropdownItemStyle : null
                            ]}
                            onPress={() => {
                                if (item === 'Any') {
                                    setSelectedClass(''); // Reset selection for "Any"
                                } else {
                                    setSelectedClass(item);
                                }
                                toggleView(); // Close the accordion after selection
                            }}
                        >
                            <Text
                                style={[
                                    styles.dropdownText,
                                    selectedClass === item || (item === 'Any' && selectedClass === '') ? styles.activeDropdownText : null
                                ]}
                            >
                                {item}
                            </Text>
                            {(selectedClass === item || (item === 'Any' && selectedClass === '')) ? (
                                <Entypo name='check' size={24} color={THEME.colors.cardBackground} />
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
};

export default FlightClassAccordion;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        borderWidth: 1,
        borderColor: THEME.colors.borderColor,
        borderRadius: SPACING.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        flexDirection: 'row',
    },
    headertext: {
        color: THEME.colors.placeholder,
        flex: 1,
        alignSelf: 'center',
    },
    childrenContainer: {
        paddingVertical: SPACING.sm,
        gap: SPACING.xs,
    },
    dropdownItem: {
        flexDirection: 'row',
        padding: SPACING.md,
        borderRadius: SPACING.sm,
        backgroundColor: THEME.colors.background,
    },
    activeDropdownItemStyle: {
        backgroundColor: THEME.colors.secondary,
    },
    dropdownText: {
        color: THEME.colors.secondary,
        fontSize: THEME.sizes.small,
        flex: 1,
    },
    activeDropdownText: {
        color: THEME.colors.background,
    },
});
