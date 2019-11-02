import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function ComicDetail(props) {

    const comic = props.comic
    const setIsShowDetailView = props.setIsShowDetailView

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: '#e6e6e6'}}>
            <TouchableOpacity onPress={() => setIsShowDetailView(false)}>
                <Text style={styles.actionText}>close</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{ comic.title }</Text>
            <Text>{ comic.month + '-' + comic.day + '-' + comic.year }</Text>
            <Text>{ comic.num }</Text>
            <Image
                style={styles.image}
                source={{uri: comic.img}}
                resizeMode='contain'
            />
            <Text>{ comic.transcript }</Text>
        </SafeAreaView>
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
        fontSize: 28,
        marginVertical: 20
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        marginVertical: 20
    },
    actionText: {
        color: 'blue'
    }
})