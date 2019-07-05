import React from 'react';
import PartySize from './PartySize.jsx';

class App extends React.Component {
    constructor() {
        super();
        
    }

    render() {
        return (
            <div>
                <h3 className="reservation-title">Make a reservation</h3>
                <PartySize />
            </div>
        )
    }
    
}

export default App;