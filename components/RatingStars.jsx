import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SPACING, THEME } from '../const/const';

const renderStars = (rating) => {
    const maxRating = 5; 
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star"
                    size={THEME.sizes.text}
                    color={THEME.colors.accent}
                />
            );
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star-half-full"
                    size={THEME.sizes.text}
                    color={THEME.colors.accent} 
                />
            );
        } else {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star-o"
                    size={THEME.sizes.text}
                    color={THEME.colors.accent} 
                />
            );
        }
    }

    return stars;
};

const RatingStars = ({ rating }) => {
    return (
        <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
                {renderStars(rating)}
            </View>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
    );
};

export default RatingStars;

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:SPACING.xs
    },
    starsContainer: {
        flexDirection: 'row',
        gap:2
    },
    ratingText: {
        fontSize: THEME.sizes.text,
        color: THEME.colors.text,
    },
});
