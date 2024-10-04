import { StatusBar, Platform } from "react-native";
import { scaleWidth, scaleHeight, scaleFont } from './scaleUtility'; // Import scaling functions

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const SPACING = {
  xs: scaleWidth(8),  // Scaling based on width
  sm: scaleWidth(12), 
  md: scaleWidth(16), 
  lg: scaleWidth(24), 
  xl: scaleWidth(32), 
};

export const THEME = {
  colors: {
    primary: '#000000',  // Black for text and buttons
    secondary: '#232323',  // Second background color
    background: '#F5F5F5',  // Light gray background for the app
    cardBackground: '#FFFFFF',  // White background for review cards
    accent: '#FFCC00',  // Yellow for ratings or highlights
    text: '#333333',  // Dark gray text color
    mutedText: '#888888',  // Lighter text color for secondary information
    placeholder: '#C4C4C4',  // Placeholder color for avatars or images
    searchBackground: '#E0E0E0',  // Light gray for input fields
    borderColor: '#E0E0E0',  // New border color for the search bar and other inputs
    imagePickerBackground: '#F8F8FF'  // Image picker background color
  },
  fonts: {
    regular: 'Arial-Regular',  // Regular text font
    bold: 'Arial-Bold',  // Bold for headers
  },
  sizes: {
    text: scaleFont(16),  // Scaled font size
    header: scaleFont(20),  // Scaled header font size
    small: scaleFont(14),  // Smaller text size for comments or labels
    large: scaleFont(24),  // Larger font size for prominent headings
    extrasmall: scaleFont(12)  // Extra small font size
  },
};
