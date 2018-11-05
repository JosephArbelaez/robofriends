import React from 'react';
import CardList from '../components/CardList'
import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';

/*
    This = The App
    States are "Smart Components" and holds the state of the app.
    constructor is blank on page load
    The page is then rendered with loading
    Then componentDidMount runs to get the robos
    Then the page is rendered again with the robos, the loading text is removed.
*/

class App extends React.Component {
    constructor() {
        super();
        this.state =  {
            robots: robots,
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: robots }));
        
    }

    // Function that changes the state based on what the value of the search text
    
    onSearchChange= (event) => {
        this.setState({ searchfield: event.target.value})
    }

    render(){
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

        /*
            This if statement is just in case 
            there are lots of information and it is slow to respond
        */
        return !robots.length ? <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    }

export default App;