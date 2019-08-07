import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, waitForElement} from '@testing-library/react';
import HomePage from './HomePage';
import {Provider} from 'react-redux';
import confStore from '../../store/configStore';
import { async } from 'q';

const store = confStore();

function renderRedux( component) {
    return {
        ...render(<Provider store = {store}>{component}</Provider>)
    };
}

it("renders",  () => {
    const {getByText} = renderRedux(<HomePage />);
    expect(getByText(/pokemons/i)).toBeInTheDocument();
    expect(getByText(/More Pokemons/i)).toBeInTheDocument();
}) 
