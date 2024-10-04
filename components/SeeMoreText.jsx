import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SPACING, THEME } from '../const/const';

const SeeMoreText = ({ text, numberOfLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false); // Controls whether "See More" should be displayed

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle text layout to detect if it exceeds numberOfLines
  const onTextLayout = useCallback((e) => {
    setShowSeeMore(e.nativeEvent.lines.length > numberOfLines);
  }, [numberOfLines]);

  return (
    <View style={styles.container}>
      {/* Conditionally display the full text or truncate to the specified number of lines */}
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={onTextLayout} // This will calculate the number of lines
        style={styles.text}
      >
        {text}
      </Text>

      {/* Show the "See More" or "See Less" based on the state and number of lines */}
      {showSeeMore && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.seeMore}>
            {isExpanded ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SeeMoreText;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },
  text: {
    fontSize: THEME.sizes.text,
    lineHeight: THEME.sizes.text + 6, // Adjust based on design
    color: THEME.colors.text,
  },
  seeMore: {
    color: THEME.colors.text,
    fontWeight: '600',
    fontSize: THEME.sizes.text,
  },
});
