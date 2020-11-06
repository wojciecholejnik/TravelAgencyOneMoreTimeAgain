import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';




const OrderOptionIcons = ({values, setOptionValue, currentValue, required}) => (
  <div className={styles.icon} key={'iconDiv'}>

    {required ? '' : (
      <div
        value={currentValue}
        onClick={() => setOptionValue('')}
        key={'0'}
      >
        <Icon key={'1'} name={'times-circle'}/>
        <p key={'2'} >none</p>
      </div>
    )}

    {values.map(value => (
      <div className={currentValue === value.id ? styles.iconActive : styles.icon}
        key={value.id}
        value={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} key={value.id}></Icon>
        {value.name}
        {formatPrice(value.price)}
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
  required: PropTypes.bool,
};


export default OrderOptionIcons;
