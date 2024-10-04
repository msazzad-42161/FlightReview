import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SPACING, THEME } from '../const/const';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.title}>Business & First Class Reviews</Text>
      <View style={styles.links}>
      <View style={styles.linkContainer}>
        <Text style={styles.link}>About</Text>
        <Text style={styles.link}>FAQ's</Text>
        <Text style={styles.link}>Terms Of Service</Text>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.link}>Privacy Policy</Text>
        <Text style={styles.link}>Cookie Policy</Text>
        <Text style={styles.link}>Contact</Text>
      </View>
      </View>
      <Text style={styles.copyright}>
        © 2024 Business & First Class Reviews
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: THEME.colors.secondary,
    alignItems: 'center',
    width:'100%',
    gap:30,
  },
  title: {
    color: '#fff',
    fontSize: THEME.sizes.header,
    fontWeight: 'bold',
    paddingTop:SPACING.md,
    paddingHorizontal:SPACING.md
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: '#fff',
    fontSize: THEME.sizes.small,
    marginHorizontal: SPACING.sm,
  },
  copyright: {
    color: '#fff',
    fontSize: THEME.sizes.extrasmall,
    width:'100%',
    borderTopWidth:StyleSheet.hairlineWidth,
    padding:20,
    textAlign:'center',
    borderColor:THEME.colors.borderColor
  },
  links:{
    gap:10,
  }
});
