import PropTypes from 'prop-types'
import React from 'react'
import './styles.scss'

const Album = (props) => {
    const { album } = props
    return (
        <div className="album">
            <div className="album__thumbnail">
                <img src={album.thumbnailUrl} alt={album.name}/>
            </div>
            <p className="album__name">{album.name}</p>
        </div>
    )
}
Album.propTypes = {
    album: PropTypes.object.isRequired
}

export default Album
