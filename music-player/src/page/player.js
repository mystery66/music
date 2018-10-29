import React,{ Component } from 'react'
import Process from '../components/Process/Process'
import $ from 'jquery'
import jPlayer from 'jplayer'
import { Router,Link } from 'react-router-dom';
import './player.css'
import Pubsub from 'pubsub-js'

let duration = null
class  Player extends Component {
  constructor (props) {
    super(props);
    this.state = {
      process: 0,
			// duration: null,
			isPlay: true,
			volume: 0,
			leftTime: ''
     
    }
  }
  componentDidMount(){
    $('#player').bind($.jPlayer.event.timeupdate, (e)=> {
     duration = e.jPlayer.status.duration;
     this.setState({
			 volume: e.jPlayer.options.volume * 100,
			 process:e.jPlayer.status.currentPercentAbsolute,
			 leftTime: this.formateTime(duration * (1-e.jPlayer.status.currentPercentAbsolute/100))
     });
   })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  processChangeHandler= (p) => {
    $('#player').jPlayer('play',duration * p)
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
  play = () =>{
		
   if(this.state.isPlay) {
		 $('#player').jPlayer('pause');
		} else {
		$('#player').jPlayer('play');
		console.log(this.state.isPlay)
	 }
	 this.setState({
		isPlay: !this.state.isPlay
	})
	}
	prev=() => {
		
		Pubsub.publish('PREV');
	
	}
	next=() => {
    Pubsub.publish('NEXT');
	}
	formateTime(time) {
    time = Math.floor(time);
    let miniutes =Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds < 10 ? `0${seconds}`:seconds;
		return `${miniutes}:${seconds}`
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
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
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
	              <i className={`icon iconfont  icon-${this.state.isPlay ? 'bofang' : 'zanting'} ml20`} onClick={this.play}></i>
	              <i className="icon iconfont icon-fanhui1 ml20" onClick={this.next}></i>
              </div>
              {/* <div className="-col-auto">
                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
              </div> */}
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