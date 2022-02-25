import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-elements'

export default function CustomDivider({
    marginTop, marginBottom, bgColor, marginLeft, marginRight,
    height
}) {
    return (
        <Divider 
            style={[{height: 0.8}, bgColor && {backgroundColor: bgColor},
            marginTop && {marginTop}, marginBottom && {marginBottom},
            marginLeft && {marginLeft}, marginRight && {marginRight},
            height && {height}]}
        />
    )
}

const styles = StyleSheet.create({})
