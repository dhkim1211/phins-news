import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import xmljs from 'xml-js';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/http://www.phins.com/phins-urls.xml')
      .then(data => {
        console.log('data', data.data);
        let formattedData = this.convertToJson(data.data);
        console.log('formattedData', formattedData);
        console.log('rss', formattedData.rss)

        this.setState({
          articles: formattedData.rss.channel.item
        })

        // for (let article of formattedData["rss"].channel.item) {
        //   console.log('title:', article.title._text)
        //   console.log('source:', article.source._text)
        //   console.log('------------------------')
        // }
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  renderArticles() {
    return this.state.articles.map(article => {
      return <Article article={article} />
    })
  }

  convertToJson(xml) {
    const parseString = xmljs.xml2js(xml, {compact: true, spaces: 4});
    return parseString;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.state.articles && this.renderArticles()}
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px',
    margin: '20px'
  },
}));

const Article = props => (
  <Paper className={useStyles().root}>
    <a href={props.article.link._text}>
      <Typography component="h3">{props.article.title._text}</Typography>
    </a>
    <Typography component="p" className="source-text">{props.article.source._text}</Typography>
    <Typography component="p">{props.article.description._text}</Typography>
  </Paper>
)



export default App;
