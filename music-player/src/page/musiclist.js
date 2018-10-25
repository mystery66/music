import React,{ Component } from 'react'
import MusicListItem from '../components/MusicListItem/MusicListItem'
class MusicList extends Component {
  render() {
    return (
      <ul>
        {this.props.musiclist.map((item) => {
          return (<MusicListItem key={item.id} musicItem={item}>{item.title}</MusicListItem>)
        })}
      </ul>
    )
  }
} 
export default MusicList; 