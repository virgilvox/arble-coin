import React, { Component } from 'react'
import styles from './styles.css'
import _ from 'lodash'

class DeviceOptions extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render({ data }){
    if(_.isEmpty(data)) return (<div>No data</div>)
    return(
      <div>
        {data}
      </div>
    )
  }
}

export default DeviceOptions
