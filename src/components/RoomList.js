import React from 'react'
import { resolveComponents } from 'uri-js';

class RoomList extends React.Component {
    render() {
        console.log(this.props.rooms )
        return(
            <div className="rooms-list" >
                {this.props.rooms.map(room => {
                    return (
                        <li>
                            <a href="#">{room.name}</a>
                        </li>
                    )
                })}
             </div>
        )
    }

}

export default RoomList;