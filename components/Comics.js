import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import ComicCard from './ComicCard';

export default function Comics(props) {

    const [ comics, setComics ] = useState([])
     
    useEffect(() => {
        getCurrentComic()
    }, [])
      
    getCurrentComic = async function() {   
        let url = 'https://any-api.com:8443/http://xkcd.com/info.0.json'
    
        try {
            const response = await fetch(url)
            const comic = await response.json()
            addComic(comic)
        } catch(ex) {
            console.error(ex)
        }
    }

    addComic = function(newComic) {
        setComics(comics.concat(newComic))
    }    
    
    return (
        <FlatList
            data={comics}
            renderItem={({ item }) => (
                <ComicCard comic={item} />
            )}
            keyExtractor={(item) => item.key}
        />
    )

}
