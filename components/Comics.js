import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';

import ComicCard from './ComicCard';

export default function Comics(props) {

    const [ comicsList, setComicsList ] = useState([])
    const [ mostRecentComicId, setMostRecentComicId ] = useState(null)
    const [ mostRecentComic, setMostRecentComic ] = useState(null)
    const [ lastFetchedComicId, setLastFetchedComicId ] = useState(null)

    useEffect(() => {
        getCurrentComic()
    }, [])

    useEffect(() => {
        if(mostRecentComicId != null) {
            getPrevFourComics(mostRecentComicId)
        } 
    }, [mostRecentComicId])
      
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
            console.log(ex)
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

    addComic = async function(newComic) {
        const prevComics = comicsList
        setComicsList(prevComics.concat([newComic]))
    }
    
    if(!comicsList || comicsList.length < 2) {
        return <ActivityIndicator />
    }
 
    return (
        <FlatList
            data={comicsList}
            renderItem={({ item }) => (
                <ComicCard comic={item} />
            )}
            keyExtractor={(item) => item.key}
        />
    )

}
