import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SPACING, THEME } from "../../const/const";
import { Image } from "expo-image";

import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import FlightClassAccordion from "@/components/FlightClassAccordion";
import DatePickerModal from "@/components/DatePickerModal";
import RatingStarInput from "@/components/RatingStarInput";

// Utility function for date string
const getDateString = (travelDate) =>
  `${travelDate.toDate().getDate().toLocaleString()} ${travelDate.format(
    "MMM"
  )}, ${travelDate.year()}`;

const ShareExperienceScreen = () => {
  const [message, setMessage] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airline, setAirline] = useState("");
  const [airlineClass, setAirlineClass] = useState("");
  const [travelDate, setTravelDate] = useState(dayjs());
  const [rating, setRating] = useState(0);
  const [fullView, setFullView] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const scrollref = useRef(null);

  // Image picker function
  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImageUri(result.assets[0].uri);
    } else {
      Alert.alert("Image not selected");
    }
  }, []);

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = useCallback(async () => {
    if (!pickedImageUri) return null;
    const data = new FormData();
    data.append("file", {
      uri: pickedImageUri,
      type: "image/jpeg",
      name: "uploaded_image.jpg",
    });
    data.append("upload_preset", "m9rzf5g8");
    data.append("cloud_name", "dpw8dphtr");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpw8dphtr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      return result.url;
    } catch (error) {
      Alert.alert("Error", "Image upload failed");
      throw error;
    }
  }, [pickedImageUri]);

  const handleSubmit = useCallback(async () => {
    if (
      !departureAirport ||
      !arrivalAirport ||
      !airline ||
      !airlineClass ||
      !message ||
      !getDateString(travelDate)
    ) {
      Alert.alert("Validation Error", "All fields must be filled.");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadImageToCloudinary(); // Upload the image first

      const experienceData = {
        departureAirport,
        arrivalAirport,
        airline,
        airlineClass,
        travelDate: getDateString(travelDate),
        rating,
        message,
        imageUrl: uploadedImageUrl, // Use the uploaded image URL
      };

      const response = await fetch(
        "https://flight-review-test-backend.onrender.com/api/experiences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experienceData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit the experience");
      }

      Alert.alert("Success", "Experience shared successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [
    departureAirport,
    arrivalAirport,
    airline,
    airlineClass,
    message,
    travelDate,
    rating,
    uploadImageToCloudinary,
  ]);

  useEffect(() => {
    if (fullView) {
      scrollref.current?.scrollToEnd({ animated: true });
    }
  }, [fullView]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Share</Text>

        <ScrollView
          ref={scrollref}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Image Upload Section */}
          <Pressable style={styles.imageUploadSection} onPress={pickImage}>
            <Image
              source={
                pickedImageUri
                  ? { uri: pickedImageUri }
                  : require("../../assets/images/image_upload_icon.png")
              }
              style={styles.imagePicker}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.uploadText}
            >
              Drop Your Image Here Or{" "}
              <Text style={styles.browseText}>Browse</Text>
            </Text>
          </Pressable>

          {/* Form Fields */}
          <TextInput
            style={styles.inputField}
            placeholder="Departure Airport"
            placeholderTextColor={THEME.colors.placeholder}
            value={departureAirport}
            onChangeText={setDepartureAirport}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Arrival Airport"
            placeholderTextColor={THEME.colors.placeholder}
            value={arrivalAirport}
            onChangeText={setArrivalAirport}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Airline"
            placeholderTextColor={THEME.colors.placeholder}
            value={airline}
            onChangeText={setAirline}
          />
          <FlightClassAccordion
            selectedClass={airlineClass}
            setSelectedClass={setAirlineClass}
            fullView={fullView}
            setFullView={setFullView}
          />

          {/* Travel Date */}
          <View style={styles.dateAndRatingContainer}>
            <TouchableOpacity
              onPress={() => setDateModalVisible(true)}
              style={styles.travelDateContainer}
            >
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={styles.dateText}
              >
                {travelDate ? getDateString(travelDate) : "Travel Date"}
              </Text>
              <Feather name="calendar" style={styles.calendaricon} />
            </TouchableOpacity>
            {/* rating */}
            <View style={{ gap: 2 }}>
              <Text style={styles.ratingText}>Rating</Text>
              <View style={styles.ratingRow}>
                <RatingStarInput rating={rating} setRating={setRating} />
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {/* Details text */}
          <TextInput
            style={styles.textInput}
            placeholder="Write your message"
            placeholderTextColor={THEME.colors.placeholder}
            multiline={true}
            numberOfLines={6}
            value={message}
            onChangeText={setMessage}
          />
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>

        <DatePickerModal
          date={travelDate}
          setDate={setTravelDate}
          visible={dateModalVisible}
          onClose={() => setDateModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default ShareExperienceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    padding: SPACING.lg,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  scrollViewContent: {
    gap: SPACING.md,
  },
  header: {
    gap: SPACING.sm,
  },
  title: {
    fontSize: THEME.sizes.header,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  avatar: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
  },
  userName: {
    fontSize: THEME.sizes.text,
    fontWeight: "600",
  },
  imagePicker: {
    width: 60,
    aspectRatio: 1,
  },
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
  uploadText: {
    fontSize: THEME.sizes.text,
    color: THEME.colors.text,
  },
  browseText: {
    color: "dodgerblue",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  inputField: {
    width: "100%",
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    textAlignVertical: "top",
  },
  dateText: {
    flex: 1,
    color: THEME.colors.placeholder,
    alignSelf: "center",
  },
  dateAndRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: SPACING.xs,
  },
  travelDateContainer: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    paddingRight: 4,
    paddingVertical: 4,
    paddingLeft: SPACING.md,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs / 2,
  },
  ratingText: {
    fontSize: THEME.sizes.small,
    color: THEME.colors.text,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: SPACING.md,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  calendaricon: {
    width: THEME.sizes.large * 2,
    aspectRatio: 1,
    backgroundColor: "#E4E4E4",
    borderRadius: SPACING.md - 4,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: THEME.sizes.large,
  },
});
