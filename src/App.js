import React from 'react';
import CardList from './CardList'
import { robots } from './robots';
import SearchBox from './SearchBox';
import './App.css';
import Scroll from './Scroll';

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
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })

        /*
            This if statement is just in case 
            there are lots of information and it is slow to respond
        */

        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else{
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            )
        }
    }
}

export default App;