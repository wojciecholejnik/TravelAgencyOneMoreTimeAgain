import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';


const trueDate = Date;
const mockDate = (customDate) =>
  class extends Date {
    constructor(...args) {
      if (args.length) {
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now() {
      return new Date(customDate).getTime();
    }
  };

const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:00.000Z`);

    const component = shallow(<DaysToSummer />);
    const renderedDays = component.find('.value').text();
    expect(renderedDays).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDate('2021-06-20', '1 day to summer !!');
  checkDescriptionAtDate('2021-06-19', '2 days to summer !!');
  checkDescriptionAtDate('2022-06-21', '');
});



describe('Component DaysToSummer', () => {
  it('render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });
  it('should render div value', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists('.value')).toEqual(true);
  });
});

