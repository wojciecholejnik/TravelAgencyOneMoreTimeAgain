import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';



const OrderSummary = props => (
  <h2 className={styles.component}>Total: <strong>{props.cost}</strong></h2>
);

OrderSummary.propTypes = {
  cost: PropTypes.node,
};

export default OrderSummary;
