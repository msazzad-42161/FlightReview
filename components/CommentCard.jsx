import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SPACING, THEME } from '../const/const'
import { Image } from 'expo-image'
import SeeMoreText from './SeeMoreText'
import {Feather,MaterialCommunityIcons,Ionicons,FontAwesome6} from '@expo/vector-icons';


const CommentCard = () => {
    const [user, setUser] = useState(null);

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
            const json = await response.json();
            const userdata = {
                name: `${json?.results[0]?.name?.first} ${json?.results[0]?.name?.last}`,
                thumbnail: json?.results[0]?.picture?.thumbnail,
            };
            return userdata;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };

    if (!user) return null; // Display nothing while data is loading

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarinfos}>
                    {/* Avatar Image */}
                    <Image
                        source={{ uri: user.thumbnail }}
                        style={styles.avatar}
                    />
                    {/* Info */}
                    <View style={{ flex: 1, }}>
                        <Text numberOfLines={2} style={styles.username}>{user.name}</Text>
                        <Text style={styles.status}>1 day ago</Text>
                    </View>
                </View>
                {/* Upvotes Info */}
                <Text style={[styles.status, { color: THEME.colors.text, fontWeight: '500' }]}>5 Upvotes</Text>
            </View>
            <SeeMoreText text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'}/>
            {/* reaction Buttons */}
            <View style={styles.reactionButtons}>
                <TouchableOpacity style={styles.reactonButton}>
                    <FontAwesome6 name="angles-up" style={styles.upvote_icon} />
                    <Text style={styles.reactionText}>Upvote</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactonButton}>
                    <Ionicons name="chatbubbles" style={styles.reply_icon} />
                    <Text style={styles.reactionText}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommentCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: SPACING.md,
        padding: SPACING.md,
        borderRadius: SPACING.md,
        backgroundColor: THEME.colors.background,
        gap:SPACING.sm
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.sm,

    },
    avatarinfos: {
        flexDirection: 'row',
        // alignItems: 'center',
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
        textAlign: 'left'
    },
    status: {
        fontSize: THEME.sizes.small,
        color: THEME.colors.mutedText,
    },
    details: {
        fontSize: THEME.sizes.text,
        lineHeight: THEME.sizes.text + 6,
        color: THEME.colors.text,
    },
    reactionButtons:{
        flexDirection:'row',
        gap:SPACING.sm,
        alignItems:'center'
    },
    reactonButton: {
        flexDirection: 'row',
        gap: SPACING.xs,
        alignItems: 'center',
    },
    reactionText: {
        fontSize: THEME.sizes.small,
        color: THEME.colors.text,
    },
    upvote_icon:{
        backgroundColor:THEME.colors.primary,
        borderRadius:THEME.sizes.text,
        fontSize:THEME.sizes.small,
        height:THEME.sizes.large,
        aspectRatio:1,
        textAlign:'center',
        textAlignVertical:'center',
        color:THEME.colors.background
    },
    reply_icon:{
        fontSize:THEME.sizes.large,
        color:THEME.colors.primary
    }
})