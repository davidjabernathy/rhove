import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

import ComicDetail from './ComicDetail';

export default function ComicCard(props) {

    const [ isShowDetailView, setIsShowDetailView ] = useState(false)

    const comic = props.comic

    return (
        <View style={styles.fullWidthContainer}>
            <TouchableOpacity style={styles.card} onPress={() => setIsShowDetailView(true)}>
                <Text style={styles.title}>{ comic.title }</Text>
                <Text>{ comic.month + '-' + comic.day + '-' + comic.year }</Text>
                <Text>{ comic.num }</Text>
                <Image
                    style={styles.image}
                    source={{uri: comic.img}}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <Modal visible={isShowDetailView} animationType="slide">
                <ComicDetail comic={comic} setIsShowDetailView={setIsShowDetailView} />
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    fullWidthContainer: {
        width: '100%', 
        alignItems: 'center', 
        marginVertical: 5,
    },
    card: {
        width: '80%',
        alignItems: 'center', 
        padding: 10, 
        borderRadius: 5, 
        backgroundColor: '#e6e6e6'
    },
    title: {
        fontSize: 20
    },
    image: {
        width: '90%', 
        height: 200
    }
})