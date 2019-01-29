import React, { Component } from 'react';
import './App.css';
import Tabletop from 'tabletop';

/*
React:
https://medium.com/@ryan.mcnierney/using-react-google-sheets-as-your-cms-294c02561d59
https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1

Deploy to S3:
https://medium.com/@abventures/how-to-build-a-react-website-in-aws-within-15-minutes-9e9c37f85aeb
 */


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: '1kOHYujR27_k1KTtXmpgNvvhdPohyQ_RefjN1tCrqONA',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      orderby: 'whichtypeofitem',
      simpleSheet: true
    })
  }

  render() {
    const { data } = this.state

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Grouping_objects_by_a_property
    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj){
        var key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    }

    // Group data by column ('Which type of item?')
    var groupedData = groupBy(data, 'Which type of item?')

    // Turn Object into a keyed Array
    let groupedDataArray = Object.entries(groupedData);
    console.log(groupedDataArray)

    // https://stackoverflow.com/questions/43756283/how-to-render-nested-array-elements-in-react
    let categoryHeadline = groupedDataArray.map((category, index) => {
      return (
        <div key={index}>
          <h1>{category[0]}</h1>
          {
            category[1].map((description, index) => {
              return (
              <p key={index}>{description['Brief description']}</p> 
              )
            })
          }
        </div>
      )
      })

    return(
      <div>
        {categoryHeadline}
      </div>
    )
  }
}

export default App;
