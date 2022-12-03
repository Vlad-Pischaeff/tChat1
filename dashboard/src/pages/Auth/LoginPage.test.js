import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import * as actions from 'store/slices/ui'
import * as hooks from 'store/hook';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import * as userApi from '../../store/api/usersApi';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useLoginUserMutation } from 'store/api/usersApi';
import { handleSubmit, useForm } from 'react-hook-form';
import { LoginPage } from './LoginPage';

const state = {
    ui: {
        message: 'test message',
        info: 'test'
    }
};

jest.mock('store/hook');
const action = jest.fn();
const mockSubmitAction = jest.fn();

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: () => ({
        ...jest.requireActual('react-hook-form').useForm(),
        handleSubmit: mockSubmitAction, //() => {console.log('handle submit ->')} //() => mockSubmitAction,
    }),
}));

describe('Login Form test', () => {

    beforeEach(() => {
        useAppSelector.mockImplementation(f => f(state));
        useAppDispatch.mockImplementation(() => action);

        render(
            <ReactRedux.Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </ReactRedux.Provider>
        );
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('renders Login Form properly', () => {
        // const action = jest.fn();
        // mockDispatcher.mockReturnValue(action);

        const formElement = screen.getByTestId('login-form');
        expect(formElement).toBeInTheDocument();

        const login = screen.getByTestId('login-input');
        expect(login).toBeInTheDocument();

        const password = screen.getByTestId('password-input');
        expect(password).toBeInTheDocument();

        const pwswitch = screen.getByTestId('eye-switch');
        expect(pwswitch).toBeInTheDocument();

        const confirm = screen.getByRole('button', {name: /login/i});
        expect(confirm).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/restore');

        expect(useAppDispatch).toHaveBeenCalled();
        expect(useAppSelector).toHaveBeenCalled();
    });

    test("should not fire login event", async () => {
        const submit = screen.getByTestId('submit-input');
        fireEvent.submit(submit);
        expect(mockSubmitAction).toHaveBeenCalled();
    });

    test('submit event while right login and password', () => {
        const login = screen.getByTestId('login-input');
        fireEvent.input(login, {
            target: { value: "LOGINNAME" }
        });
        const password = screen.getByTestId('password-input');
        fireEvent.input(password, {
            target: { value: "PASSWORD" }
        });
        const submit = screen.getByTestId('submit-input');
        fireEvent.submit(submit);

        expect(mockSubmitAction).toHaveBeenCalledWith({ arg: 123 });
    });
})
