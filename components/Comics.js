import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet, AsyncStorage } from 'react-native';

import ComicCard from './ComicCard';

export default function Comics(props) {

    const [ comicsList, setComicsList ] = useState([])
    const [ mostRecentComicId, setMostRecentComicId ] = useState(null)
    const [ mostRecentComic, setMostRecentComic ] = useState(null)
    const [ lastFetchedComicId, setLastFetchedComicId ] = useState(null)
    const [ isDescending, setIsDescending ] = useState(true)
    const [ didMount, setDidMount ] = useState(false)
    
    useEffect(() => {
        setDidMount(true)
    },[])

    // get the most recent comic
    useEffect(() => {
        getCurrentComic()
    }, [])

    // get new 4 comics after we know the most recent comic id
    useEffect(() => {
        if(mostRecentComicId != null) {
            getPrevFourComics(mostRecentComicId)
        } 
    }, [mostRecentComicId])

    // empty the list when the order is reversed
    useEffect(() => {
        if(didMount) {
            setComicsList([])
        }

    }, [isDescending])

    // get the first few comics after the order is reversed
    useEffect(() => {
        if(didMount) {
            if(!isDescending && comicsList.length == 0) {
                getNextFourComics(0, true)
            } if(isDescending && comicsList.length == 0) {
                getPrevFourComics(mostRecentComicId, true)
            }
        }
    }, [comicsList])
      
    getCurrentComic = async function() {
        let url = 'https://any-api.com:8443/http://xkcd.com/info.0.json'
    
        try {
            const response = await fetch(url)
            const comic = await response.json()
            await addComic(comic)
            setMostRecentComic(comic)
            setMostRecentComicId(comic.num)
            setLastFetchedComicId(comic.num)
            
        } catch(ex) {
            console.error(ex)
        }
    }

    getComicById = async function(comicNumber) {
        if(comicNumber >= 0 && (mostRecentComicId === null || comicNumber <= mostRecentComicId)) {
            const comicFromStorage = await AsyncStorage.getItem('comic-' + comicNumber)
            if(comicFromStorage != null) {
                console.log('comic found in storage')
                return JSON.parse(comicFromStorage)
            } else {
                let url = 'https://any-api.com:8443/http://xkcd.com/' + comicNumber + '/info.0.json'
    
                try {
                    console.log('fetching comic')
                    const response = await fetch(url)
                    const comic = await response.json()
                    AsyncStorage.setItem('comic-' + comicNumber, JSON.stringify(comic))
                    return comic
                } catch(ex) {
                    console.error(ex)
                }               
            }
        }
    }

    getPrevFourComics = async (prevId, reset) => {

        var first = await getComicById(prevId - 1)
        var second = await getComicById(prevId - 2)
        var third = await getComicById(prevId - 3)
        var fourth = await getComicById(prevId - 4)

        setLastFetchedComicId(prevId - 4)

        const prevComics = reset ? [mostRecentComic] : comicsList
        setComicsList(prevComics.concat([first, second, third, fourth]))
    }

    getNextFourComics = async (prevId) => {

        var first = await getComicById(prevId + 1)
        var second = await getComicById(prevId + 2)
        var third = await getComicById(prevId + 3)
        var fourth = await getComicById(prevId + 4)

        setLastFetchedComicId(prevId + 4)

        const prevComics = comicsList
        setComicsList(prevComics.concat([first, second, third, fourth]))
    }

    addComic = async function(newComic) {
        const prevComics = comicsList
        setComicsList(prevComics.concat([newComic]))
    }

    reverseOrder = async () => {
        // changing isDecending will trigger an effect
        setIsDescending(!isDescending)      
    }

    getMoreComics = async () => {
        if(isDescending) {
            await getPrevFourComics(lastFetchedComicId)
        } else {
            await getNextFourComics(lastFetchedComicId)
        }
    }
    
    if(!comicsList || comicsList.length < 2) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator />
            </View>
        )
    }
 
    return (
        <View>
            <FlatList
                data={comicsList}
                renderItem={({ item }) => (
                    <ComicCard comic={item} />
                )}
                keyExtractor={(item) => item.num.toString()}
                ListHeaderComponent={() => {
                    return (
                        <View style={{width: '90%', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => reverseOrder()}><Text style={styles.actionText}>reverse order</Text></TouchableOpacity>
                        </View>
                    )
                }}
                onEndReached={() => getMoreComics()}
                onEndReachedThreshold={0.01}
                ListFooterComponent={() =>{
                    return <ActivityIndicator />
                }}
            />
        </View>
    )

}

styles = StyleSheet.create({
    centerContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionText: {
        color: 'blue',
        fontSize: 20
    }
})
