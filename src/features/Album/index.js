import React from 'react'
import AlbumList from './components/AlbumList'

const AlbumFeature = () => {

    const albumList = [
        {
            id: 1,
            name: "Dong Nhi",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/cover/4/0/6/b/406bc70ed9d288f7ddd5b16e0775ecce.jpg"
        },
        {
            id: 2,
            name: "Dong Nhi Binh",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/cover/4/0/6/b/406bc70ed9d288f7ddd5b16e0775ecce.jpg"
        },
        {
            id: 3,
            name: "Dong Nhi An",
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w480_r1x1_jpeg/cover/4/0/6/b/406bc70ed9d288f7ddd5b16e0775ecce.jpg"
        },

    ]

    return (
        <div>
            <h2>Co the ban se thich</h2>
            <AlbumList albumList = {albumList}/>
        </div>
    )
}

export default AlbumFeature
