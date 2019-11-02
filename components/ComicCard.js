import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ComicCard(props) {

    const comic = props.comic

    return (
        <View style={styles.fullWidthContainer}>
            <TouchableOpacity style={styles.card}>
                <Text style={styles.title}>{ comic.title }</Text>
                <Text>{ comic.month + '-' + comic.day + '-' + comic.year }</Text>
                <Text>{ comic.num }</Text>
                <Text>{ comic.transcript }</Text>
                <Image
                    style={styles.image}
                    source={{uri: comic.img}}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    fullWidthContainer: {
        width: '100%', 
        alignItems: 'center', 
        marginVertical: 5
    },
    card: {
        width: '80%',
        alignItems: 'center', 
        padding: 10, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: 'blue'
    },
    title: {
        fontSize: 20
    },
    image: {
        width: '90%', 
        height: 200
    }
})