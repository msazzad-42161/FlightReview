import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { SPACING, THEME } from "../../const/const";
import CustomImagePicker from "@/components/CustomImagePicker";

const AskQuestionScreen = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickedImageUris, setPickedImageUris] = useState([]); // For multiple image URIs

  // Function to upload multiple images to Cloudinary
  const uploadImagesToCloudinary = useCallback(async () => {
    if (!pickedImageUris || pickedImageUris.length === 0) return [];

    const uploadedUrls = [];

    for (const uri of pickedImageUris) {
      const data = new FormData();
      data.append("file", {
        uri: uri,
        type: "image/jpeg",
        name: "uploaded_image.jpg",
      });
      data.append("upload_preset", "m9rzf5g8"); // Replace with your Cloudinary preset
      data.append("cloud_name", "dpw8dphtr"); // Replace with your Cloudinary cloud name

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dpw8dphtr/image/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        uploadedUrls.push(result.url); // Add each uploaded image URL to the array
      } catch (error) {
        Alert.alert("Error", "Image upload failed");
        throw error;
      }
    }

    return uploadedUrls; // Return array of uploaded URLs
  }, [pickedImageUris]);

  const handleSubmit = useCallback(async () => {
    if (!message.trim()) {
      Alert.alert("Validation Error", "Message cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(); // Upload multiple images

      const questionData = {
        message,
        imageUrls: uploadedImageUrls, // Use array of uploaded image URLs
      };

      const response = await fetch("https://flight-review-test-backend.onrender.com/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit the question");
      }

      Alert.alert("Success", "Question submitted successfully");
      setMessage("");
      setPickedImageUris([]); // Reset the image state after submission
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [message, pickedImageUris, uploadImagesToCloudinary]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Ask A Question</Text>

        {/* Image Upload Section */}
        <CustomImagePicker pickedImageUris={pickedImageUris} setPickedImageUris={setPickedImageUris} />

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
          <Text style={styles.submitButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AskQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    padding: SPACING.lg,
  },
  cardContainer: {
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  title: {
    fontSize: THEME.sizes.header,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
