import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { statusActions } from "../../store/status-slice";
import Status, { status } from "../../shared/status";

export default function Register() {

    const dispatch = useDispatch()
    const history = useHistory()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
    }, [history, isAuthenticated])


    const validationMessages = {
        PasswordMismatch: "Passwords didn't match.",
        PasswordMatched: 'Passwords matched',
        InvalidEmailAddress: 'Invalid Email Address',
        ValidEmailAddress: 'Valid Email Address'
    }

    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formValid, setFormValid] = useState(false)

    const [passwordMatchData, setPasswordMatchData] = useState({
        className: '',
        validationMessage: ''
    })

    const [emailValidData, setEmailValidData] = useState({
        className: '',
        validationMessage: ''
    })

    const [formResponseData, setFormResponseData] = useState(status)

    function arePasswordMatched() {
        return registerData.password === registerData.confirmPassword;
    }

    function isEmailValid() {
        let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailValidator.test(registerData.email)
    }

    function inputChangeHandler(event) {
        setRegisterData(prev => {
            prev[event.target.name] = event.target.value
            return prev;
        })

        setFormValid(prev => {
            return registerData.firstName
                && registerData.lastName
                && isEmailValid()
                && registerData.password
                && registerData.confirmPassword
                && arePasswordMatched()
        }
        )
    }

    function confirmPasswordHandler() {
        if (arePasswordMatched()) {
            setPasswordMatchData({
                className: 'text-success',
                validationMessage: validationMessages.PasswordMatched
            })
        }
        else {
            setPasswordMatchData({
                className: 'text-danger',
                validationMessage: validationMessages.PasswordMismatch
            })
        }
    }

    function emailChangeHandler() {
        if (!isEmailValid()) {
            setEmailValidData({
                className: 'text-danger',
                validationMessage: validationMessages.InvalidEmailAddress
            })
        }
        else {
            setEmailValidData({
                className: 'text-success',
                validationMessage: validationMessages.ValidEmailAddress
            })
        }
    }

    function blurEvent() {

        if (arePasswordMatched()) {
            setPasswordMatchData({
                className: '',
                validationMessage: ''
            })
        }

        if (isEmailValid()) {
            setEmailValidData({
                className: '',
                validationMessage: ''
            })
        }

    }

    async function onFormSubmit(event) {
        event.preventDefault()
        await fetch('register', {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json;'
            }
        })
            .then(result => {
                if (!result.ok) throw result;
                return result.json();
            })
            .then(response => {
                dispatch(statusActions.add(response))

                if (response.statusCode === 1) {
                    setTimeout(() => {
                        history.push('/login')
                    }, 3000)
                }
            })
            .catch(error =>
                dispatch(statusActions.add(error))
            )
    }



    return (
        <>
            <h4 style={{ paddingLeft: '6em' }}>
                Register Here
            </h4>
            <form onSubmit={onFormSubmit}>
                <div className="container">
                    <Status status={formResponseData}></Status>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 text-end">
                            First Name
                        </div>
                        <div className="col-3">
                            <input type="text"
                                className="form-control"
                                name="firstName"
                                onChange={inputChangeHandler}
                                required pattern="^[a-zA-Z]+$" />
                            <span className="text-danger field-validation-valid"
                                data-valmsg-for="lastName"
                                data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 text-end">
                            Last Name
                        </div>
                        <div className="col-3">
                            <input type="text"
                                className="form-control"
                                name="lastName"
                                onChange={inputChangeHandler}
                                required pattern="^[a-zA-Z]+$" />
                            <span className="text-danger field-validation-valid"
                                data-valmsg-for="lastName"
                                data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 text-end">
                            Email
                        </div>
                        <div className="col-3">
                            <input type="text"
                                className="form-control"
                                name="email"
                                onBlur={blurEvent}
                                onKeyUp={emailChangeHandler}
                                onChange={inputChangeHandler}
                                required />
                            <span className={emailValidData.className}
                                data-valmsg-for="email"
                                data-valmsg-replace="true">{emailValidData.validationMessage}</span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 text-end">
                            Password
                        </div>
                        <div className="col-3">
                            <input type="password"
                                className="form-control"
                                name="password"
                                onChange={inputChangeHandler}
                                required />
                            <span className="text-danger field-validation-valid"
                                data-valmsg-for="password"
                                data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 text-end">
                            Confirm Password
                        </div>
                        <div className="col-3">
                            <input type="password"
                                className="form-control"
                                name="confirmPassword"
                                onBlur={blurEvent}
                                onChange={inputChangeHandler}
                                onKeyUp={confirmPasswordHandler}
                                required />
                            <span className={passwordMatchData.className + " field-validation-valid"}
                                data-valmsg-for="confirmPassword"
                                data-valmsg-replace="true">{passwordMatchData.validationMessage}</span>
                        </div>
                    </div>
                </div>
                <div className="row rowpad5px m-2">
                    <div className="col-2"></div>
                    <div className="col-4 text-center">
                        <input type="submit"
                            className="btn btn-primary m-2"
                            value="Register"
                            disabled={!formValid ? "disabled" : ""}
                        />
                        <input type="reset" className="btn btn-secondary m-2" value="Clear" />
                    </div>
                </div>
            </form>
        </>
    );
}

