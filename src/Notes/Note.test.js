import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Note from './Note';
import NotesList from './NotesList';


describe(`Note component`, () => {
    const props = {
        id: 'a',
        name: 'test-class-name',
        modified: new Date(2020, 15, 5)
    }
    it('renders a Note by default', () => {
    //the shallow function creates a WRAPPER instance of the Component we want to interact with
        const wrapper = shallow(<Note />);
        expect(toJson(wrapper)).toMatchSnapshot()
    });
    it('renders the Note given props', () => {
        const wrapper = shallow(<Note {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});
describe(`NotesList component`, () => {
    it('renders an empty array by default', () => {
        const wrapper = shallow(<NotesList />);
        expect(wrapper).toMatchSnapshot();
    });
})
