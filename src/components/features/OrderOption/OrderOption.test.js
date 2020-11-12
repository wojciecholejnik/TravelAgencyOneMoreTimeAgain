import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';


describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    expect(shallow(<OrderOption type='dropdown' name='defaultName' />)).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    // console.log(component.debug());
    expect(component).toEqual({});
  });
  it('should have expected title from props', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption type='dropdown' name={expectedName} />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toBe(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */

    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
      // console.log(renderedSubcomponent.debug());
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
      /* tests for icons */
        it('render correct elements', () => {
          const icons = renderedSubcomponent.find('.icon');
          expect(icons.length).toBe(mockProps.values.length);
        });
        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
      /* tests for checkboxes */
        it('render correct elements', () => {
          const checkboxes = renderedSubcomponent.find('input');
          expect(checkboxes.length).toBe(mockProps.values.length);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find({value: testValue}).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }
      case 'number': {
      /* tests for number */
        it('contains input type=number', () => {
          const number = renderedSubcomponent.find('input');
          expect(number.prop('type')).toBe('number');
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber});
        });
        break;
      }
      case 'text': {
        /* tests for text */
        it('contains text type=text', () => {
          const text = renderedSubcomponent.find('input');
          expect(text.prop('type')).toBe('text');
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }
      case 'date': {
        /* tests for date */
        it('contains Datepicker', () => {
          const date = renderedSubcomponent.find(DatePicker);
          expect(date).toBeTruthy();
        });
        // it('should run setOrderOption function on change', () => {
        //   renderedSubcomponent.find(DatePicker).simulate('change', testValue);  // <<<  w metodzie simulate() zamiast testValue stosawałem juz chyba wszystko co mozliwe: {currentTarget: testValue}, {value: testValue} itp
        //   expect(mockSetOrderOption).toBeCalledTimes(1);    // <<<< w odpowiedzi dostaje 'Received number of calls: 0' Dlaczego ??
        //   // expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });

        //   /*   tekst z zadania:
        //   W tym wypadku nie mamy inputa czy selecta, ale komponent DatePicker i to właśnie jego
        //   będziemy szukać (find(Datepicker)). Komponent musimy zaimportować, nie ma potrzeby jednak
        //   go renderować – wystarczy, że zasymulujemy na nim event change, a jako drugi argument
        //   podamy testValue zamiast obiektu, który do tej pory wstawialiśmy w to miejsce.

        //   */
        // });
        break;
      }
    }

  });
}
