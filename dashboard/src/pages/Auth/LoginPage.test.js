import { render, screen, fireEvent, act } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import * as actions from 'store/slices/ui'
import * as hooks from 'store/hook';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import * as userApi from '../../store/api/usersApi';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { useLoginUserMutation } from 'store/api/usersApi';
import { LoginPage } from './LoginPage';

// jest.mock("react-redux", () => ({
//     ...jest.requireActual("react-redux"),
//     useSelector: jest.fn(),
//     useDispatch: jest.fn(),
// }));
// const mockDispatcher = jest.spyOn(ReactRedux, 'useDispatch');
const state = {
    ui: {
        message: 'test message',
        info: 'test'
    }
};

jest.mock('store/hook');

describe('Login Form test', () => {
    const action = jest.fn();
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

    test('renders Login Form', () => {
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

    test("should display correct error message", () => {

        const login = screen.getByRole('button', {type: /submit/i});

        act(() => {
            fireEvent.click(login);
            // expect(useAppDispatch).toHaveBeenCalledWith("any");
            expect(action).toBeCalledTimes(1);
            // expect(loginFn).toHaveBeenCalledTimes(1);

        });


        screen.debug();
    });
})
