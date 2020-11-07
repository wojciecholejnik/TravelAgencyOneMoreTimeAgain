import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('has correct src and alt', () => {
    const expectedImg = 'image.jpg';
    const expectedAlt = 'alt';
    const component =shallow (
      <TripSummary id='abc' image={expectedImg} name={expectedAlt} cost='' days={1} tags={['tag1', 'tag2']} />);
    const renderedImg = component.find('img');
    const renderAlt = component.find('img');

    expect(renderedImg.prop('src')).toEqual(expectedImg);
    expect(renderAlt.prop('alt')).toEqual(expectedAlt);
  });
  it('has correct link address', () => {
    const expectedLink = '/trip/abc';
    const component = shallow (
      <TripSummary id='abc' image='' name='' cost='' days={1} tags={['tag1', 'tag2']} />);
    const renderedLink = component.find('.link').prop('to');
    expect(expectedLink).toBe(renderedLink);
  });
  it('if props: "name", "cost" and "days", render correctly', () => {
    const component = shallow (
      <TripSummary id='' image='' name='name' cost='cost' days={1} tags={['tag1', 'tag2']} />);
    expect(component).toBeTruthy();
  });
  it('if any of the props are missing an error is raised', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
  it('rendered tags in spans in the right order', () => {
    const expectedTag = 'tag2';
    const component = shallow (
      <TripSummary id='' image='' name='name' cost='cost' days={1} tags={['tag1', expectedTag, 'tag3']} />);
    expect(component.find('.tag').at(1).text()).toBe(expectedTag);
  });
  it('if props tags is false or an empty array then div with the tags class should not be rendered at all', () => {
    const expectedTags = [];
    const component = shallow (
      <TripSummary id='' image='' name='' cost='' days={1} tags={expectedTags}/>);
    expect(component.find('.tags').exists()).toBe(false);
  });
});
