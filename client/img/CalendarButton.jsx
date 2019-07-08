import React from 'react';
import moment from 'moment';

class SVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBox: '0 0 5.24 8.07',
    };

    this.checkPastMonth = this.checkPastMonth.bind(this);
    this.getFillAndClassName = this.getFillAndClassName.bind(this);
  }
  
  getFillAndClassName(input) {
    let { toPriorMonth } = this.props;
    
    if (toPriorMonth === undefined) {
      return input;
    }
    if (this.checkPastMonth()) {
      return input;
    }
    if (input === '#23333') {
      return '#d8d9db';
    }
    
    return input + ' diable-switch-calendar';
  }
  
  checkPastMonth() {
    const { momentDate } = this.props;
    const priorMonth = momentDate.clone().subtract(1, 'month');
    const curMonth = moment();

    if (priorMonth.diff(curMonth, 'month') >= 0) {
      return true;
    }

    return false;
  }

  render() {
    const { viewBox } = this.state;
    const { className, toNextMonth, toPriorMonth } = this.props;

    return (
      <svg
        className={this.getFillAndClassName(className)}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={toNextMonth ? toNextMonth : toPriorMonth}
      >
        <path
          fill={this.getFillAndClassName('#23333')}
          d="M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z"
        />
      </svg>
    );
  }
}

export default SVG;
