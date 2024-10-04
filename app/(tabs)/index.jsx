import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { SPACING, THEME } from '@/const/const';
import { Image } from 'expo-image';
import PostCard from '@/components/PostCard';
import AdContainer from '@/components/AdContainer';
import { AppContext } from '@/context/AppContext';


export default function Home() {

  // New state variables for fetched experiences and questions
  const [experiences, setExperiences] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);  // Refreshing state for pull-to-refresh

  // Query string for search
  const {queryString} = useContext(AppContext)

  // Fetch experiences from the API
  const fetchExperiences = async () => {
      try {
          setLoading(true);
          const response = await fetch(`https://flight-review-test-backend.onrender.com/api/experiences${queryString}`);
          const data = await response.json();
          if (response.ok) {
              setExperiences(data);
          } else {
              throw new Error(data.message || 'Failed to load experiences');
          }
      } catch (error) {
          Alert.alert('Error', error.message || 'Failed to fetch experiences');
      } finally {
          setLoading(false);
          setRefreshing(false); // Stop the refreshing indicator
      }
  };

  // Fetch questions from the API
  const fetchQuestions = async () => {
      try {
          setLoading(true);
          const response = await fetch('https://flight-review-test-backend.onrender.com/api/questions');
          const data = await response.json();
          if (response.ok) {
              setQuestions(data);
          } else {
              throw new Error(data.message || 'Failed to load questions');
          }
      } catch (error) {
          Alert.alert('Error', error.message || 'Failed to fetch questions');
      } finally {
          setLoading(false);
      }
  };

  // Fetch experiences when queryString changes
  useEffect(() => {
      fetchExperiences();
  }, [queryString]);  // Triggers whenever queryString changes

  // Fetch questions on component mount (only once)
  useEffect(() => {
      fetchQuestions();
  }, []);

  const handleRefresh = () => {
      setRefreshing(true);
      fetchExperiences();
      fetchQuestions();

  };

  return (
          <View style={styles.container}>
              {/* body */}
              <ScrollView
                  contentContainerStyle={styles.body}
                  refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                  }
              >
                  {/* Action Buttons: share and review*/}
                  {/* <View style={styles.actionButtonsContainer}>
                      <TouchableOpacity onPress={() => setShareExperienceModalVisible(true)} style={styles.button}>
                          <Text style={styles.buttonText}>Share Your Experience</Text>
                          <FontAwesome5 name="users" size={THEME.sizes.small} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setQuestionModalVisible(true)} style={styles.button}>
                          <Text style={styles.buttonText}>Ask A Question</Text>
                          <FontAwesome5 name="user" size={THEME.sizes.small} color="white" />
                      </TouchableOpacity>
                  </View> */}
                  {/* search bar */}
                  {/* <Pressable onPress={() => setSearchModalVisible(true)} style={styles.searchbar_container}>
                      <Text style={styles.searchbar_placeholder}>Search anything...</Text>
                      <Feather name='search' style={styles.searchbar_icon} />
                  </Pressable> */}
                  {/* banner */}
                  <Image
                      source={'https://visitqatar.com/content/dam/visitqatar/about-qatar/sports-page/formula-1/f1-banner-test.jpg/_jcr_content/renditions/medium-1280px.jpeg'}
                      style={styles.banner}
                  />
                  {loading ? (
                      <View style={styles.loaderContainer}>
                          <ActivityIndicator size={'large'} color={THEME.colors.secondary} />
                      </View>
                  ) : (
                    <>
                    <AdContainer />
                    <AdContainer />
                          {/* Experience, Question and Ads */}
                          {experiences.reverse().map((experience, index) => (
                              <PostCard type={'experience'} key={index.toString()} post={experience} />
                          ))}
                          {questions.reverse().map((question, index) => (
                              <PostCard type={'question'} key={index.toString()} post={question} />
                          ))}
                      </>
                  )}
              </ScrollView>
          </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
      width: "100%",
      aspectRatio: 2,
      alignItems: 'center',
      justifyContent: 'center',
  },
  container: {
      flex: 1,
  },
  body: {
      backgroundColor: THEME.colors.background,
      paddingVertical: SPACING.md,
      gap: SPACING.md,
  },
  actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.md,
      gap: SPACING.xs,
  },
  button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: THEME.colors.secondary,
      padding: SPACING.md,
      borderRadius: SPACING.md,
      gap: SPACING.xs,
      flexGrow: 1,
      justifyContent: 'space-evenly',
  },
  buttonText: {
      color: 'white',
      fontSize: THEME.sizes.small,
      fontWeight: '600',
  },
  searchbar_container: {
      padding: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: SPACING.md,
      backgroundColor: THEME.colors.cardBackground,
      borderWidth: 1,
      borderColor: THEME.colors.borderColor,
      borderRadius: SPACING.md,
      overflow: 'hidden',
  },
  searchbar_placeholder: {
      color: THEME.colors.placeholder,
      flex: 1,
      padding: SPACING.sm,
      alignSelf: 'center',
  },
  searchbar_icon: {
      aspectRatio: 1,
      padding: SPACING.sm,
      borderRadius: SPACING.md - 2,
      backgroundColor: THEME.colors.secondary,
      color: '#fff',
      fontSize: THEME.sizes.large,
      textAlign: 'center',
      textAlignVertical: 'center',
  },
  banner: {
      aspectRatio: 3,
      marginHorizontal: SPACING.md,
      borderRadius: SPACING.md,
  },
});
