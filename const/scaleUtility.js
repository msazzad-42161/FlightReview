import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guidelines for standard sizes (based on a standard device like iPhone X dimensions)
const baseWidth = 375;
const baseHeight = 812;

// Function to scale based on screen width
const scaleWidth = (size) => (width / baseWidth) * size;

// Function to scale based on screen height
const scaleHeight = (size) => (height / baseHeight) * size;

// Function to normalize font sizes (for text)
const scaleFont = (size) => size * PixelRatio.getFontScale();

export { scaleWidth, scaleHeight, scaleFont };
