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
    console.log('updated state --->', this.state)
    const { data } = this.state

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Grouping_objects_by_a_property
    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj){
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    var groupedData = groupBy(data, 'Which type of item?');
    console.log('data --->', data)
    console.log('groupedData --->', groupedData)

    return 0;
    // return (
    //   {
    //     <div className="App">
    //       <div id="business-beat-item">
    //         console.log(Object.keys(groupedData))
    //           for (let i=0; i<groupedData.length; i++) {
    //             console.log(groupedData[i]);
    //           }
    //       </div>
    //     </div>
    //   }
    // );
  }
}

export default App;
