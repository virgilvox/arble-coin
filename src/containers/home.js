import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import QrView from '../components/QrView'

const style = {
  margin: 5,
  textAlign: 'center',
  display: 'flex',
  'align-content': 'center',
  'justify-content': 'center',
}

const homeStyle = {
  display: 'flex',
  'align-content': 'center',
  'justify-content': 'center',
}

const Home = () => (
  <div>
    <AppBar
      title="arblecoin"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <div style={homeStyle}>
      <Paper style={style}>
        <QrView />
      </Paper>
    </div>
  </div>
)

export default Home
