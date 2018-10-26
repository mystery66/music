import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
import Player from './page/player'
import $ from 'jquery'
import jPlayer from 'jplayer'
import { MUSIC_LIST } from './config/musiclist'

import { BrowserRouter as Router, Route} from 'react-router-dom'
import Pubsub from 'pubsub-js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musiclist: MUSIC_LIST,
      currentMusicList: MUSIC_LIST[0] 
    }
  }
  playMusic(musicItem) {
    console.log(musicItem);
    $('#player').jPlayer('setMedia',{
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState({
      currentMusicList: musicItem
    })
  }
  playnext(type) {
    let index = this.findMusicIndex(this.state.currentMusicList)
    let newIndex = null;
    let musicListLen = this.state.musiclist.length; 
    if(type === 'next') {
      newIndex = (index +1)%musicListLen; //下一曲

    } else {
      newIndex = (index - 1 + musicListLen)%musicListLen
    }
    this.playMusic(this.state.musiclist[newIndex]);
  }
  findMusicIndex(musicItem) {
    return this.state.musiclist.indexOf(musicItem);
  }
  componentDidMount(){
    $('#player').jPlayer({
     ready: function () {
       $(this).jPlayer('setMedia', {
         'mp3': 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
       }).jPlayer('play');
     },
     supplied: 'mp3',
     wmode: 'window'
   });
   $('#player').bind($.jPlayer.event.ended, (e) => {
     this.playnext()
   })
   Pubsub.subscribe('PREV',(msg,musicItem) =>{
     this.playnext('prev');
   })
   Pubsub.subscribe('NEXT',(msg,musicItem) =>{
    this.playnext('next');
   })
  }
  componentWillUnmount() {
    Pubsub.unsubscribe('PREV')
    Pubsub.unsubscribe('NEXT')
    $('#player').unbind($.jPlayer.event.ended);
  }
  render() {
  
   
   
    return (
      
        <div className="app">
         <Header/>
         <Player  musiclist={this.state.musiclist} currentMusicList={this.state.currentMusicList} />
        </div>
     
    );
  }
}

export default App;
