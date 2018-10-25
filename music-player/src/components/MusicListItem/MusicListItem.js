import React,{ Component } from 'react'
import './MusicListItem.css'
class MusicListItem extends Component {
  render() {
    let musicItem = this.props.musicItem;
    return (
      
        <li className="listitem">
          <p><strong>{musicItem.title}-{musicItem.artist}</strong></p>
          <p className="-col-auto delete"></p>
        </li>
      
    )
  }
}
export default MusicListItem;