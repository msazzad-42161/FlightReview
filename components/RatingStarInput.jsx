import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SPACING, THEME } from '../const/const';

const MAX_RATING = 5;

const RatingStarInput = ({ rating, setRating }) => {
  const [starRatings, setStarRatings] = useState(Array(MAX_RATING).fill(0));

  const handleStarPress = (index) => {
    const newStarRatings = starRatings.map((value, i) => {
      if (i < index) {
        return 1;
      } else if (i === index) {
        if (value === 0) {
          return 0.5;
        } else if (value === 0.5) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

    setStarRatings(newStarRatings);
    const totalRating = newStarRatings.reduce((acc, cur) => acc + cur, 0);
    setRating(totalRating);
  };

  const renderStars = () => {
    return starRatings.map((starValue, index) => {
      let starIcon;
      if (starValue === 1) {
        starIcon = 'star';
      } else if (starValue === 0.5) {
        starIcon = 'star-half-full';
      } else {
        starIcon = 'star-o';
      }

      return (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
          <FontAwesome name={starIcon} size={THEME.sizes.header} color={THEME.colors.accent} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.starsContainer}>
      {renderStars()}
    </View>
  );
};

export default RatingStarInput;

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
  },
});
