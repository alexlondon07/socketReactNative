import React, {Component} from 'react'
import {View, Text, StyleSheet, StatusBar} from 'react-native';

export default class Header extends Component {
    render() {
        return (
        <View style={styles.header}>
            <StatusBar backgroundColor="lightseagreen" barStyle="light-content" />
            <Text style={styles.title}>
            #{this.props.title}
            </Text>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: '#0055aa',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
});