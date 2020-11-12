import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  description: '.promoDescription',
};

const mockProps = {
  title: 'Lorem ipsum',
  promoDescription: 'ipsum Lorem',
};

describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.description)).toEqual(true);
  });
  it('should render title text from props', () => {
    const expectedTitle = mockProps.title;
    const component = shallow(<HappyHourAd {...mockProps} />);
    console.log(component.debug());
    const renderedTitle = component.find(select.title).text();
    expect(expectedTitle).toEqual(renderedTitle);
  });
});
