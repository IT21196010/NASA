// SignIn.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Install redux-mock-store if not already installed
import SignIn from './SignIn';

describe('SignIn component', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        loading: false,
        error: null,
      },
    });
  });

  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    expect(getByText('NASA-API Reader')).toBeInTheDocument();
    expect(getByText('This is a demo project. You can sign in with your email and password or with Google.')).toBeInTheDocument();
    expect(getByPlaceholderText('name@company.com')).toBeInTheDocument();
    expect(getByPlaceholderText('**********')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Dont Have an account?')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should dispatch signInStart action on form submission', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.submit(getByText('Sign In'));

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'user/signInStart' }]);
  });

  it('should display error message when form is submitted with missing fields', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );

    fireEvent.submit(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Please fill out all fields.')).toBeInTheDocument();
    });
  });

  // Add more test cases to cover other scenarios, such as successful form submission and error handling
});
