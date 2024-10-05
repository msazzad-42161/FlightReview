import React, { useCallback } from "react";
import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { SPACING, THEME } from "@/const/const";

const CustomImagePicker = ({pickedImageUris, setPickedImageUris}) => {

  // Image picker function
  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allows multiple image selection
      quality: 1,
    });

    if (!result.canceled) {
      // Use functional update form of setPickedImageUris to ensure latest state is used
      setPickedImageUris((prevUris) => {
        const newUris = result.assets.map((asset) => asset.uri);
        const updatedUris = [...prevUris, ...newUris];
        console.log("Updated URIs:", updatedUris); // Log here to confirm
        return updatedUris; // Append new images to the previous state
      });
    } else {
      Alert.alert("Image not selected");
    }
  }, []);

  return (
      <Pressable style={styles.imageUploadSection} onPress={pickImage}>
        {pickedImageUris.length ? (
          <View style={styles.imageGrid}>
            {pickedImageUris.map((image, index) => (
              <View style={styles.gridImageContainer} key={index.toString()}>
                <Image
                  source={{ uri: image }}
                  style={{ ...StyleSheet.absoluteFill, borderRadius: SPACING.xs }}
                />
                <Pressable
                  style={styles.removeButton}
                  onPress={() => {
                    // Remove the image by filtering out the selected index
                    setPickedImageUris((prevUris) =>
                      prevUris.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <Feather
                    name="x"
                    size={THEME.sizes.extrasmall}
                    color={"#fff"}
                  />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <Image
            source={require("@/assets/images/image_upload_icon.png")}
            style={styles.imagePicker}
          />
        )}
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.uploadText}
        >
          Drop Your Image Here Or <Text style={styles.browseText}>Browse</Text>
        </Text>
      </Pressable>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  imageUploadSection: {
    width: "100%",
    padding: SPACING.xl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BEC5E9",
    borderRadius: SPACING.lg,
    gap: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.imagePickerBackground,
  },
  imagePicker: {
    width: "30%",
    aspectRatio: 1,
  },
  uploadText: {
    fontSize: THEME.sizes.text,
    color: THEME.colors.text,
  },
  browseText: {
    color: "dodgerblue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: SPACING.xs,
  },
  gridImageContainer: {
    width: "30%",
    height:"30%",
    aspectRatio: 1,
    borderRadius: SPACING.xs,
  },
  removeButton: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: THEME.colors.secondary,
    padding: 2,
    borderRadius: SPACING.xs,
  },
});
