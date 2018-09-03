import React from 'react'

class RoomList extends React.Component {
    render() {
        return (
            <div className="rooms-list" >
                <h3>Rooms</h3>
                <ul className="room" >
                {this.props.rooms.map(room => {
                    return (
                        <li key={room.id}>
                            <a 
                            onClick={() => this.props.subscribeToRoom(room.id)}
                                href="#">#{room.name}
                                </a>
                        </li>
                    )
                })}
                </ul>
             </div>
        )
    }

}

export default RoomList;