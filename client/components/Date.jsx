import React from 'react';
import SVG from '../img/SelectionIcon';
import Calendar from './Calendar';

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
    };

    this.changeShowCalendarStatus = this.changeShowCalendarStatus.bind(this);
    this.toShowCalendar = this.toShowCalendar.bind(this);
  }

  changeShowCalendarStatus() {
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  toShowCalendar() {
    if (this.state.showCalendar === true) {
      const { changeRenderDate, renderDate } = this.props;
      return (
        <Calendar 
          changeShowCalendarStatus={this.changeShowCalendarStatus}
          changeRenderDate={changeRenderDate}
          renderDate={renderDate}
        />
      );
    }
    return <div></div>;
  }

  render() {
    return (
      <div 
        className="date-selection-detail-wrapper"
      >
        <div 
          className="date-input-text"
          onClick={this.changeShowCalendarStatus}
        >
          {this.props.renderDate.format('ddd, MM/D')}
        </div>
        <SVG />
        {this.toShowCalendar()}
      </div>
    );
  }
}

export default Date;
