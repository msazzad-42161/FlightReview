import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SPACING, THEME } from '../const/const'

const AdContainer = () => {
  return (
    <View style={{paddingHorizontal:SPACING.md}}>
    <View style={styles.container}>
      <Text style={styles.text}>ads</Text>
    </View>
    </View>
  )
}

export default AdContainer

const styles = StyleSheet.create({
    container:{
        width:'100%',
        aspectRatio:1.5,
        borderRadius:SPACING.md,
        backgroundColor:THEME.colors.cardBackground,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        textTransform:'uppercase',
        fontWeight:'900',
        fontSize:THEME.sizes.large,
    }
})