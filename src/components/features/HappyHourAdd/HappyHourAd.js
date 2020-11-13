import React from 'react';
import styles from './HappyHourAd.scss';
import PropTypes from 'prop-types';


class HappyHourAd extends React.Component {
  constructor(){
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  setPromoText(){
    const timeLeft = this.getCountdownTime();
    if(timeLeft>82800){
      return this.props.promoDescription;
    } else {
      return timeLeft;
    }
  }

  render() {

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{this.props.title}</h3>
        <div className={styles.promoDescription}>
          {this.setPromoText()}
        </div>
      </div>
    );
  }
}

export default HappyHourAd;
