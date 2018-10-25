import React,{ Component } from 'react'
import Process from '../components/Process/Process'
import $ from 'jquery'
import jPlayer from 'jplayer'
import { Router,Link } from 'react-router-dom';
import './player.css'

class  Player extends Component {
  constructor (props) {
    super(props);
    this.state = {
      process: 0,
			duration: null,
			isPlay: true,
			volume: 0
     
    }
  }
  componentDidMount(){
    console.log(1);
   $('#player').bind($.jPlayer.event.timeupdate, (e)=> {
     this.state.duration = e.jPlayer.status.duration;
     this.setState({
			 volume: e.jPlayer.options.volume * 100,
       process:e.jPlayer.status.currentPercentAbsolute
     });
   })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  processChangeHandler= (p) => {
    
    $('#player').jPlayer('play', this.state.duration * p)
    this.setState({
      process: p
    })
 
 
	}
	changeVolumeHandlers = (p) => {
		console.log('ppppp'+p);
		$('#player').jPlayer('volume', p)
		this.setState({
			volume: p
		})
	}
  play(){
   if(this.state.isPlay) {
		 $('#player').jPlayer('pause');
		 this.state.isPlay = false;
	 } else {
		$('#player').jPlayer('play');
		this.state.isPlay = true;
		
	 }
	}
  render() {
    return (
      <div className="player-page">
        <h1 className="desc">
				  我的私人音乐坊 &gt;
				</h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">{this.props.currentMusicList.title}</h2>
            <h3 className="music-artist mt10">{this.props.currentMusicList.artist}</h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-2:00</div>
              <div className="volume-container">
                <i className="icon iconfont icon-laba rt" style={{top: 5, left: -5}}></i>
                <div className="volume-wrapper">
								<Process process={this.state.volume} onProcessChange={this.changeVolumeHandlers} barColor="#999"></Process>
								</div>
              </div>
            </div>
            <div className="volume" style={{height: 10, lineHeight: '10px'}}>
			        <Process process={this.state.process} onProcessChange={this.processChangeHandler} ></Process>
            </div>
            <div className="player-content">
              <div>
	              <i className="icon iconfont icon-fanhui prev" onClick={this.prev}></i>
	              <i className={`icon iconfont  icon-${this.state.isPlay ? 'bofang' : 'zanting'} ml20`} onClick={this.play.bind(this)}></i>
	              <i className="icon iconfont icon-fanhui1 ml20" onClick={this.next}></i>
              </div>
              <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
              </div>
            </div>
          </div>
        <div className="song-pic cover">
          <img src={this.props.currentMusicList.cover}alt={this.props.currentMusicList.cover} className="song-cover"/>
        </div>
    </div>
		<div id="player"></div>
  </div>
    )
  }
} 
export default Player;