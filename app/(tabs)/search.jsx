import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SPACING, THEME } from "../../const/const";
import FlightClassAccordion from "@/components/FlightClassAccordion";
import { AppContext } from "@/context/AppContext";
import { useNavigation } from "expo-router";

const SearchScreen = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airline, setAirline] = useState("");
  const [airlineClass, setAirlineClass] = useState("");
  const [fullView, setFullView] = useState(false);

  const { queryString, setQueryString } = useContext(AppContext);

  const scrollRef = useRef(null);
  const navigation = useNavigation()

  useEffect(() => {
    if (fullView) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [fullView]);

  const changeString = useCallback(() => {
    const params = new URLSearchParams();
    if (departureAirport) params.append("departureAirport", departureAirport);
    if (arrivalAirport) params.append("arrivalAirport", arrivalAirport);
    if (airline) params.append("airline", airline);
    if (airlineClass && airlineClass !== "Class")
      params.append("airlineClass", airlineClass);

    setQueryString(`?${params.toString()}`);
  }, [departureAirport, arrivalAirport, airline, airlineClass, setQueryString]);

  const handleSubmit = useCallback(() => {
    changeString();
    navigation.navigate('index')
  }, [changeString]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Search</Text>
        <ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
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
          {/* Flight Class */}
          <FlightClassAccordion
            selectedClass={airlineClass}
            setSelectedClass={setAirlineClass}
            fullView={fullView}
            setFullView={setFullView}
          />
        </ScrollView>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchScreen;

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
    maxHeight:'100%'
  },
  scrollViewContent: {
    gap: SPACING.md,
  },
  title: {
    fontSize: THEME.sizes.header,
    fontWeight: "bold",
  },
  inputField: {
    width: "100%",
    borderWidth: 1,
    borderColor: THEME.colors.borderColor,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
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
});
