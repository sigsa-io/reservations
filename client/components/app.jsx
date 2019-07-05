import React from 'react';
import PartySize from './PartySize.jsx';
import Time from './Time.jsx';

class App extends React.Component {
    constructor() {
        super();
        
    }

    render() {
        return (
            <div>
                <h3 className="reservation-title">Make a reservation</h3>
                <div>
                    <h4 className="reservation-party-size-title">Party Size</h4>
                    <PartySize />
                </div>
                <div>
                    <h4 className="reservation-time-title">Time</h4>
                    <Time />
                </div>
            </div>
        )
    }
    
};

export default App;