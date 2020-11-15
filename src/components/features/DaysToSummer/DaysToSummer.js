import React from 'react';
import styles from './DaysToSummer.scss';
import PropTypes from 'prop-types';



class DaysToSummer extends React.Component {
  static propTypes = {
    value: PropTypes.node,
  }

  getDaysToSummer(){
    const currentDate = new Date();
    const nextSummer = new Date(Date.UTC(currentDate.getUTCFullYear(), 5, 21));
    if (currentDate.getMonth() > 8 || (currentDate.getUTCMonth() === 8 && currentDate.getUTCDate() > 23)) {
      nextSummer.setUTCFullYear(nextSummer.getUTCFullYear() + 1);
    }

    const msLeft = nextSummer-currentDate;
    const daysToSummer = Math.floor(msLeft/(24*60*60*1000));

    if(daysToSummer<=0){
      return '';
    } else if (daysToSummer == 1) {
      return '1 day to summer !!';
    } else {
      return daysToSummer + ' days to summer !!';
    }


  }

  render(){
    const countdownDays = this.getDaysToSummer();
    return(
      <div className={styles.component}>
        <div className={styles.value}>{countdownDays}</div>
      </div>
    );
  }
}

export default DaysToSummer;
