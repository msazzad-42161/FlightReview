import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SPACING, THEME } from '../const/const';
import { Image } from 'expo-image'; // expo-image is a fast image loading library
import RatingStars from './RatingStars';
import SeeMoreText from './SeeMoreText';
import { Feather,Octicons,Ionicons } from '@expo/vector-icons';
import CommentCard from './CommentCard';

const PostCard = ({post,type}) => {
    const [user, setUser] = useState(null);
    const departureAirport = post.departureAirport;
    const arrivalAirport = post.arrivalAirport;
    const airlineName = post.airline;
    const airlineClass = post.airlineClass;
    const date = post.travelDate;
    const rating = post.rating;
    const details = post.message;
    const image = post.imageUrl;
    const chips = [
        `${departureAirport} - ${arrivalAirport}`, airlineName, airlineClass, date
    ];
    // console.log(post)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserInfo();
            setUser(data);
        };
        fetchData();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/');
    
            // Check if the response is OK and not empty
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
    
            // Check for empty response before attempting to parse
            const text = await response.text();
            if (!text) {
                throw new Error('Received an empty response from the server.');
            }
    
            // Parse the JSON only if the response has content
            const json = JSON.parse(text);
            const userdata = {
                name: `${json?.results[0]?.name?.first} ${json?.results[0]?.name?.last}`,
                thumbnail: json?.results[0]?.picture?.thumbnail,
            };
            return userdata;
    
        } catch (error) {
            console.error("Error fetching random user data from randomuser.me:", error);
            return null; // Gracefully return null if there's an error
        }
    };
    

    if (!user) return null;

    return (
        <View style={styles.postContainer}>
            {/* Post card */}
            <Pressable style={styles.card}>
                {/* Avatar info & rating row -> header */}
                <View style={styles.header}>
                    <View style={styles.avatarInfo}>
                        {/* Avatar Image */}
                        <Image
                            source={{ uri: user.thumbnail }}
                            style={styles.avatar}
                        />
                        {/* Info */}
                        <View style={{ flex: 1 }}>
                            <Text numberOfLines={2} style={styles.username}>{user.name}</Text>
                            <Text style={styles.status}>1 day ago</Text>
                        </View>
                    </View>
                    {/* Placeholder for rating or other header info */}
                    {type==='experience' && (
                        <RatingStars rating={rating} />
                    )}
                </View>

                {/* Info chips */}
                {type==='experience' && (
                <View style={styles.chips}>
                {chips.map((value, index) => (
                    <Text style={styles.chip} key={index.toString()}>{value}</Text>
                ))}
            </View>
                )}

                {/* Details text */}
               {details && (
                <View style={styles.details}>
                    <SeeMoreText
                        text={details}
                        numberOfLines={2}
                    />
                </View>

               )}
                
                {/* Image */}
                {image && (
                <View style={styles.details}>
                    <Image
                        source={{ uri: image }}
                        style={styles.postImage}
                    />
                </View>
                )}

                {/* Reaction info */}
                <View style={styles.reactionInfoRow}>
                    <Text style={styles.reactionText}>30 Like</Text>
                    <View style={styles.separator} />
                    <Text style={styles.reactionText}>20 Comment</Text>
                </View>

                {/* Reaction buttons */}
                <View style={styles.reactionButtons}>
                    <TouchableOpacity style={styles.reactionButton}>
                        <Feather name="thumbs-up" size={THEME.sizes.large} color={THEME.colors.text} />
                        <Text style={styles.reactionText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reactionButton}>
                        <Feather name="share" size={THEME.sizes.large} color={THEME.colors.text} />
                        <Text style={styles.reactionText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
            {/* Comments section */}
            <CommentCard />
            <Text style={styles.moreCommentText}>See More Comments</Text>
            <View style={styles.commentrow}>
                {/* Avatar Image */}
                <Image
                            source={{ uri: user.thumbnail }}
                            style={styles.avatar}
                        />
                        <View style={styles.commentbox}>
<TextInput
placeholder='Write Your Comment'
style={styles.commentstyle}
placeholderTextColor={THEME.colors.mutedText}
cursorColor={THEME.colors.mutedText}
selectionColor={THEME.colors.mutedText}
/>
{/* <Octicons name="paper-airplane" size={THEME.sizes.large} color={THEME.colors.text} /> */}
<Ionicons name="send" size={THEME.sizes.large} color={THEME.colors.text} />

                        </View>
            </View>
        </View>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    postContainer: {
        marginHorizontal: SPACING.md,
        backgroundColor: THEME.colors.cardBackground,
        borderRadius: SPACING.md,
        gap: SPACING.md,
        paddingVertical:SPACING.md
    },
    card: {
        gap: SPACING.sm,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },
    avatarInfo: {
        flexDirection: 'row',
        gap: SPACING.xs,
        flex: 1,
    },
    avatar: {
        width: 48,
        aspectRatio: 1,
        borderRadius: 24,
        backgroundColor: '#C4C4C4', // Placeholder color before image loads
    },
    username: {
        fontSize: THEME.sizes.text,
        fontWeight: 'bold',
        color: THEME.colors.text,
        textAlign: 'left',
    },
    status: {
        fontSize: THEME.sizes.small,
        color: THEME.colors.mutedText,
    },
    chips: {
        flexDirection: 'row',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: THEME.colors.background,
        color: THEME.colors.text,
        padding: SPACING.xs,
        fontSize: THEME.sizes.extrasmall,
        borderRadius: SPACING.xs,
    },
    details: {
        paddingHorizontal: SPACING.md,
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor:THEME.colors.background
    },
    reactionInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
    },
    reactionText: {
        fontSize: THEME.sizes.small,
        color: THEME.colors.text,
    },
    separator: {
        width: 4,
        aspectRatio: 1,
        borderRadius: 2,
        backgroundColor: THEME.colors.text,
    },
    reactionButtons: {
        flexDirection: 'row',
        gap: SPACING.sm,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
    },
    reactionButton: {
        flexDirection: 'row',
        gap: SPACING.xs,
        alignItems: 'center',
        // paddingTop: SPACING.xs,
    },
    moreCommentText:{
        paddingHorizontal:SPACING.md,
        fontSize:THEME.sizes.text,
        fontWeight:'bold',
        color:THEME.colors.mutedText
    },
    commentrow:{
        flexDirection:'row',
        gap:SPACING.xs,
        marginHorizontal:SPACING.md
    },
    commentbox:{
        flexDirection:'row',
        gap:SPACING.xs,
        alignItems:'center',
        backgroundColor:THEME.colors.background,
        flex:1,
        borderRadius:SPACING.lg,
        paddingHorizontal:SPACING.sm,
        overflow:'hidden'
    },
    commentstyle:{
        flex:1,
        fontSize:THEME.sizes.small,
        height:'100%'
    }
});
