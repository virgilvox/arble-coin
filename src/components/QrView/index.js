import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import QrReader from 'react-qr-reader'
import styles from './styles.css'

import _ from 'lodash'

import BleDevice from '../../services/ble-service'

class QrView extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      deviceData: {}
    }

    this.handleScan = this.handleScan.bind(this)
    this.handleConnect = this.handleConnect.bind(this)
    this.startNotify = this.startNotify.bind(this)
  }
  handleScan(data){
    if(_.isEmpty(data)) return
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }

  handleConnect(){
    this.bleDevice = new BleDevice({ name: this.state.result })
  }

  startNotify(){
    const characteristics =  this.bleDevice.getDeviceCharacteristics()
    _.forEach(characteristics.notify, (value, key) => {
      this.bleDevice.startNotify(value, (eventObj) => {
        let data = this.state.deviceData
        data[key] = eventObj.rawValue
        this.setState({
          deviceData: data
        })
      })
    })
  }

  render(){
    const previewStyle = {
      height: '100%',
      width: '100%',
    }

    return(
      <Card>
        <CardHeader title="QrView"/>
        <CardMedia
          overlay={<CardTitle title="Show the QR Code" subtitle="This will identify the device" />}
        >
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            />
        </CardMedia>
        <CardText>
          <p>{this.state.result}</p>
        </CardText>
        <CardTitle title="Device Options" />
        <CardActions>
          <FlatButton onClick={this.handleConnect}>Connect</FlatButton>
          <FlatButton onClick={this.startNotify}>Subscribe</FlatButton>
        </CardActions>

        <CardText>{JSON.stringify(this.state.deviceData)}</CardText>
      </Card>
    )
  }
}

export default QrView
