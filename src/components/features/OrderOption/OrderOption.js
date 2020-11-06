import React from 'react';
// import PropTypes from 'prop-types';
// import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderOption.scss';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';


const optionTypes = {
  text: OrderOptionText,
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  date: OrderOptionDate,
};

const OrderOption = ({name, type, setOrderOption, id, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent {...otherProps} setOptionValue={value => setOrderOption({[id]: value})} />
      </div>
    );
  }
};


export default OrderOption;
