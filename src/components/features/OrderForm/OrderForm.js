import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import Button from '../../common/Button/Button';


const sendOrder = (options, tripCost, id, tripName, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  if (options.name.length == 0 || options.contact.length == 0) {
    window.alert('Complete your contact details');
  } else {
    const payload = {
      ...options,
      tripName,
      id,
      countryCode,
      totalCost,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });

    window.alert('Your order has been accepted !!');
  }
};

const OrderForm = ({tripCost, options, setOrderOption, id, tripName, countryCode}) => (
  <Row>
    {pricing.map(option =>(
      <Col md={4} key={option.id}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
      </Col>
    ))}

    <Col xs={12}>
      <OrderSummary cost={tripCost} options={options} />
      <Button onClick={() => sendOrder(options, tripCost, id, tripName, countryCode)}>Order now!</Button>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
  id: PropTypes.string,
};


export default OrderForm;
