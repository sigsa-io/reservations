import React from 'react';
import PartySize from './PartySize.jsx';
import Time from './Time.jsx';

class App extends React.Component {
    constructor() {
        super();
        
    }

    render() {
        return (
            <div className="reservation-frame">
                <div className="reservation-title-wrapper">
                    <h3 className="reservation-title">
                        <span>Make a reservation</span>
                    </h3>
                </div>
                <div className="reservation-detail-wrapper">
                    {/* will need to insert the scrolling shrink tag here */}
                    <div className="reservation-detail-selection">
                        <div>
                            <h4 className="reservation-detail-title">Party Size</h4>
                            <PartySize />
                        </div>
                        <div>
                            <h4 className="reservation-detail-title">Time</h4>
                            <Time />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
};

export default App;