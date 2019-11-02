import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';

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

    useEffect(() => {
        getCurrentComic()
    }, [])

    useEffect(() => {
        if(mostRecentComicId != null) {
            getPrevFourComics(mostRecentComicId)
        } 
    }, [mostRecentComicId])

    useEffect(() => {
        if(didMount) {
            setComicsList([])
        }

    }, [isDescending])

    useEffect(() => {
        debugger
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
        let url = 'https://any-api.com:8443/http://xkcd.com/' + comicNumber + '/info.0.json'
    
        try {
            const response = await fetch(url)
            debugger
            const comic = await response.json()
            return comic
        } catch(ex) {
            console.error(ex)
        }
    }

    getPrevFourComics = async (prevId, reset) => {

        var first = await getComicById(prevId - 1)
        var second = await getComicById(prevId - 2)
        var third = await getComicById(prevId - 3)
        var fourth = await getComicById(prevId - 4)

        const prevComics = reset ? [mostRecentComic] : comicsList
        setComicsList(prevComics.concat([first, second, third, fourth]))
    }

    getNextFourComics = async (prevId) => {

        var first = await getComicById(prevId + 1)
        var second = await getComicById(prevId + 2)
        var third = await getComicById(prevId + 3)
        var fourth = await getComicById(prevId + 4)

        const prevComics = comicsList
        setComicsList(prevComics.concat([first, second, third, fourth]))
    }

    addComic = async function(newComic) {
        const prevComics = comicsList
        setComicsList(prevComics.concat([newComic]))
    }

    reverseOrder = async () => {
        setIsDescending(!isDescending)  
    }
    
    if(!comicsList || comicsList.length < 2) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator />
            </View>
        )
    }
 
    return (
        <FlatList
            data={comicsList}
            renderItem={({ item }) => (
                <ComicCard comic={item} />
            )}
            keyExtractor={(item) => item.key}
            ListHeaderComponent={() => {
                return <TouchableOpacity onPress={() => reverseOrder()}><Text>reverse order</Text></TouchableOpacity>
            }}
        />
    )

}

styles = StyleSheet.create({
    centerContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
