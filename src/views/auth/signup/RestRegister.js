import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert, Toast } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER_USERS } from './../../../config/constant';
import { useDispatch } from 'react-redux';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

const RestRegister = ({ className, ...rest }) => {
    const scriptedRef = useScriptRef();
    const [showToastError, setShowToastError] = React.useState(false);
    const dispatcher = useDispatch();

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    username: '',
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('name is required'),
                    surname: Yup.string().required('Surname is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post(API_SERVER_USERS + 'users/signup', {
                                name: values.name,
                                surname: values.surname,
                                username: values.username,
                                password: values.password,
                                email: values.email
                            })
                            .then(function (response) {
                                console.log(response);
                                if (response.data) {
                                    dispatcher({
                                        type: ACCOUNT_INITIALIZE,
                                        payload: { isLoggedIn: true, user: response.data.user, token: response.data.token }
                                    });
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                if (error.response.data.detail === 'The user with this username or email already exists in the system.') {
                                    setShowToastError(true);
                                }
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setSubmitting(false);
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.name && errors.name}
                                label="name"
                                placeholder="name"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.name}
                            />
                            {touched.name && errors.name && <small className="text-danger form-text">{errors.name}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.surname && errors.surname}
                                label="surname"
                                placeholder="surname"
                                name="surname"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.surname}
                            />
                            {touched.surname && errors.surname && <small className="text-danger form-text">{errors.username}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.username && errors.username}
                                label="Username"
                                placeholder="Username"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.username}
                            />
                            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Email Address"
                                placeholder="Email Address"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                            />
                            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Password"
                                placeholder="Password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}
                        <Row>
                            <Col mt={2}>
                                <Button
                                    className="btn-block"
                                    color="primary"
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                >
                                    Sign UP
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            <hr />

            <Toast
                show={showToastError}
                onClose={() => {
                    setShowToastError(false);
                }}
            >
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>

                <Toast.Body>El usuario ya existe</Toast.Body>
            </Toast>
        </React.Fragment>
    );
};

export default RestRegister;
