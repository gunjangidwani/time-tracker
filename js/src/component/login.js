import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import validator from 'validator'
import {ApiConstant} from '../constant'
import {doRegister} from '../action/register.action'
import {doLogin} from '../action/user.action'
import {connect} from 'react-redux'
import './style.css';

const apiConst = new ApiConstant();

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const styles = {
    parent1: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    appName: {
        // height: '150px',
        color: '#2965CC',
        fontSize: '1.5rem'
    },
    desc: {
        padding: '30px 0px',
        fontSize: '1.25rem',
        '& span': {
            fontSize: '1rem',
            color: '#676565'
        }
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'streach',
        justifyContent: 'start',
        width: '100%'
    },
    button: {

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0 10px 0'
    },
    text: {
        minWidth: '100%'
    },
    image: {
        height: '100%',
        // backgroundImage: `url(${team})`,
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'

    },
    parent: {
        height: '100%',
        width: '100%',
        boxSizing: 'content-box'
    }

}

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            showLogin: true,
            showRegister: false,
            loginUser: {
                email: '',
                password: ''
            },
            registerUser: {
                full_name: '',
                email: '',
                password: ''
            },
            errors: {
                full_name: '',
                email: '',
                password: ''
            },
            LoggedUserData: {},
            LoginDataIsTrue: false,
            registerDataIsTrue: false
        }
    }

    _handleChangeLogin = (event, attr) => {
        event.preventDefault()
        const logindata = Object.assign({}, this.state.loginUser)
        logindata[attr] = event.target.value
        if (!validator.isEmpty(logindata[attr])) {
            this.setState(() => {
                return {
                    ...this.state,
                    loginUser: logindata
                }
            }, () => this._enableLoginBtn())
        }
    }

    _enableLoginBtn = () => {
        if ((validator.isEmail(this.state.loginUser.email) && !validator.isEmpty(this.state.loginUser.password))) {
            this.setState(() => {
                return {
                    ...this.state,
                    LoginDataIsTrue: true
                }
            })
        }
    }

    _handleChangeRegister = (event, attr) => {
        event.preventDefault();
        const registerData = Object.assign({}, this.state.registerUser)
        let errors = this.state.errors
        registerData[attr] = event.target.value

        switch (attr) {
            case 'full_name':
                errors.full_name = event.target.value.length < 5
                    ? 'Full Name must be 5 characters long!'
                    : '';
                break;
            case 'email':
                errors.email = validEmailRegex.test(event.target.value)
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password':
                errors.password = event.target.value.length < 8
                    ? 'Password must be 8 characters long!'
                    : '';
                break;
            default:
                break;
        }
        const isEmpty = Object
            .values(errors)
            .every(x => (x === null || x === ''));
        console.log(isEmpty);
        if (isEmpty) {
            console.log("allowed")
            this.setState(() => {
                return {
                    ...this.state,
                    registerUser: registerData,
                    registerDataIsTrue: true,
                    errors
                }
            })
        } else {
            this.setState(() => {
                console.log("not-allowed")
                return {
                    ...this.state,
                    registerDataIsTrue: false,
                    registerUser: registerData,
                    errors
                }
            })
        }

    }
    _openRegisterForm = () => {
        this.setState(state => ({
            showRegister: !state.showRegister,
            showLogin: !state.showLogin
        }));
    }

    _handleDoLogin = (event) => {
        event.preventDefault();
        if (validator.isEmail(this.state.loginUser.email) && !validator.isEmpty(this.state.loginUser.password)) {

            const loginObject = {
                url: apiConst.BASE_URL + apiConst.LOGIN,
                body: this.state.loginUser
            }
            this
                .props
                .doLogin(loginObject)
        } else {
            alert("please check if the details are correct or not")
        }

    }

    _handleDoRegister = (event) => {
        event.preventDefault();
        if (Object.values(this.state.errors).every(x => (x === null || x === ''))) {
            const registerObject = {
                url: apiConst.BASE_URL + apiConst.REGISTER,
                body: this.state.registerUser
            }
            this
                .props
                .doRegister(registerObject)
        } else {
            alert("please check if the details are correct or not")
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps) console.log(nextProps.userReducer)
        if (nextProps.userReducer.status && nextProps.userReducer.value !== null) {
            this.setState(() => {
                return {
                    ...this.state,
                    LoggedUserData: nextProps.userReducer.value
                }
            })
            // console.log(this.state.LoggedUserData)
            this.props.history.push('/landingPage')
        }
    }

    render() {
        const {classes} = this.props;
        const {errors, registerDataIsTrue} = this.state;
        return (
            <React.Fragment>
                <div container="container" spacing={0} className={classes.parent}>

                    <div item="item" xs={4} sm={4} className={classes.parent1}>
                        <div className={classes.parent1}>
                            <div
                                className={classes.appName}
                                style={{
                                    color: '#2965CC'
                                }}>
                                <h3 >Time Tracker</h3>
                            </div>
                            <div className='form-wrapper'>

                                {
                                    this.state.showLogin && <form>
                                            <label>Enter the Details below to Login</label>
                                            <div className='email'>
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type='text'
                                                    name='email'
                                                    onChange={(e) => this._handleChangeLogin(e, 'email')}
                                                    noValidate="noValidate"/>
                                            </div>
                                            <br/>
                                            <div class="password">
                                            <label htmlFor="password">Password</label>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    onChange={(e) => this._handleChangeLogin(e, 'password')}
                                                    noValidate="noValidate"/>
                                            </div>
                                            <div className={classes.button}>
                                            <button
                                            type='button'
                                                    onClick={(e) => this._handleDoLogin(e)}
                                                    disabled={registerDataIsTrue}>Login</button>
                                            <button type='button' onClick={this._openRegisterForm}>Sign up</button>
                                            </div>
                                        </form>
                                }
                                {
                                    this.state.showRegister && <form noValidate="noValidate">
                                            <div className='full_name'>
                                                <label htmlFor="full_name">Full Name</label>
                                                <input
                                                    type='text'
                                                    name='full_name'
                                                    onChange={(e) => this._handleChangeRegister(e, 'full_name')}
                                                    noValidate="noValidate"/>
                                            </div>
                                            <div className='email'>
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    onChange={(e) => this._handleChangeRegister(e, 'email')}
                                                    noValidate="noValidate"/>
                                            </div>
                                            <div className='password'>
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    onChange={(e) => this._handleChangeRegister(e, 'password')}
                                                    noValidate="noValidate"/>
                                            </div>
                                            <div className='info'>
                                                {/* <small>Password must be eight characters in length.</small> */}
                                                <small>{errors.password}</small>
                                                <br></br>
                                                <small>{errors.email}</small>
                                                <br></br>
                                                <small>{errors.full_name}</small>
                                                <br></br>
                                            </div>
                                            <div className='submit'>
                                                <button type='button'
                                                    onClick={(e) => this._handleDoRegister(e)}
                                                    disabled={!registerDataIsTrue}>Register</button>
                                                <button type='button' onClick={(e) => this._openRegisterForm(e)}>
                                                    Already a user?
                                                </button>
                                            </div>
                                        </form>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {userReducer: state.userReducer}
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (loginObject) => dispatch(doLogin(loginObject)),
        doRegister: (registerObject) => dispatch(doRegister(registerObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(
    Login
))