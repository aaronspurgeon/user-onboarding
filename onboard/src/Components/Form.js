import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';


const UserForm = ({ errors, touched, status }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        
    })

    return (
        <Form>
            {touched.user && errors.user && <p className="error">{errors.user}</p>}
            <Field type="text" name="user" placeholder="Name"></Field>
            <Field type="email" name="email" placeholder="Email"></Field>
            <Field type="password" name="password" placeholder="Password"></Field>
            <Field type="checkbox" name="terms"></Field>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            user: values.user || '',
            email: values.email || '',
            password: values.password || '',
            terms: values.terms || false
        }
    },
    validationSchema: yup.object().shape({
        user: yup.string().required('Name is required!'),
        email: yup.string().required('Email is required!'),
        password: yup.string().required('Password is required!'),
        terms: yup.boolean().oneOf([true], 'Must agree to terms of service')
    })
})(UserForm);

