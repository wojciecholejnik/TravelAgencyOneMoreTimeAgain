import React from 'react';
import styles from './HappyHourAdd.scss';
import PropTypes from 'prop-types';


class HappyHourAd extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {

    return (
      <div >
        <h3 className={styles.title}>{this.props.title}</h3>
        <div className={styles.promoDescription}></div>
      </div>
    );
  }
}

export default HappyHourAd;
