import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
const styles = StyleSheet.create({
  expandText: {
    color: '#014c92',
    marginTop: 0,
    textAlign: 'center',
  },
})

export const readMoreExpandView = () => <Text style={styles.expandText}>Read More</Text>
export const defaultCollapseView = () => <Text style={styles.expandText}>Collapse</Text>