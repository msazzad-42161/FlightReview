import React, { useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SPACING, THEME } from '../../const/const';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

const AskQuestionScreen = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pickedImageUri, setPickedImageUri] = useState(null);

  // Image picker function with square cropping
  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // This forces square cropping
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImageUri(result.assets[0].uri); // Set the picked image URI
    } else {
      Alert.alert('Image not selected');
    }
  }, []);

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = useCallback(async () => {
    if (!pickedImageUri) return null;

    const data = new FormData();
    data.append('file', {
      uri: pickedImageUri,
      type: 'image/jpeg',
      name: 'uploaded_image.jpg',
    });
    data.append('upload_preset', 'm9rzf5g8'); // Replace with your Cloudinary preset
    data.append('cloud_name', 'dpw8dphtr'); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dpw8dphtr/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      return result.url;
    } catch (error) {
      Alert.alert('Error', 'Image upload failed');
      throw error;
    }
  }, [pickedImageUri]);

  const handleSubmit = useCallback(async () => {
    if (!message.trim()) {
      Alert.alert("Validation Error", "Message cannot be empty");
      return;
    }

    setLoading(true);

    try {
      let uploadedImageUrl = null;

      if (pickedImageUri) {
        uploadedImageUrl = await uploadImageToCloudinary();
      }

      const questionData = {
        message,
        imageUrl: uploadedImageUrl,
      };

      const response = await fetch('https://flight-review-test-backend.onrender.com/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit the question');
      }

      Alert.alert('Success', 'Question submitted successfully');
      setMessage('');
      setPickedImageUri(null); // Reset the image state after submission
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [message, pickedImageUri, uploadImageToCloudinary]);

  return (
    <View style={styles.container}>
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Ask A Question</Text>

    {/* Image Upload Section */}
    <Pressable style={styles.imageUploadSection} onPress={pickImage}>
      <Image
        source={pickedImageUri ? { uri: pickedImageUri } : require('../../assets/images/image_upload_icon.png')}
        style={styles.imagePicker}
      />
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.uploadText}>
        Drop Your Image Here Or <Text style={styles.browseText}>Browse</Text>
      </Text>
    </Pressable>

    {/* Text Input */}
    <TextInput
      style={styles.textInput}
      placeholder="Write your message"
      placeholderTextColor={THEME.colors.placeholder}
      multiline={true}
      numberOfLines={6}
      value={message}
      onChangeText={setMessage}
    />

    {/* Submit Button */}
    <TouchableOpacity
      style={[styles.submitButton, loading && { opacity: 0.5 }]}
      onPress={handleSubmit}
      disabled={loading}
    >
      <Text style={styles.submitButtonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
    </TouchableOpacity>
    </View>
    </View>
  );
};

export default AskQuestionScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:THEME.colors.background,
    padding: SPACING.lg,
  },
  cardContainer: {
    // flex: 1,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  title: {
    fontSize: THEME.sizes.header,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  avatar: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
  },
  userName: {
    fontSize: THEME.sizes.text,
    fontWeight: '600',
  },
  imagePicker: {
    width: 60,
    aspectRatio: 1,
  },
  imageUploadSection: {
    width: '100%',
    padding: SPACING.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BEC5E9',
    borderRadius: SPACING.lg,
    gap: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.imagePickerBackground,
  },
  uploadText: {
    fontSize: THEME.sizes.text,
    color: THEME.colors.text,
  },
  browseText: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
