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

  // https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  createOutput = (groupedDataArray) => {
    console.log('groupedDataArray at top of createOutput --->', groupedDataArray)
    let Output = []

    for (let i = 0; i < groupedDataArray.length; i++) {
      let children = []
      for (let j = 0; j < groupedDataArray[i][1].length; j++) {
        children.push(<p>{groupedDataArray[i][1][j]['Brief description']}</p>)
      }
      Output.push(<b>{children}</b>)
    }
    return Output
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

    // May still need to look at this: https://kolosek.com/react-jsx-loops/
    return(
      <div>
        {this.createOutput(groupedDataArray)}
      </div>
    )
  }
}

export default App;
