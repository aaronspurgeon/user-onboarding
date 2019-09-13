import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';


const UserForm = ({ errors, touched, status }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (status) {
            setData([ ...data, status ])
        }
    }, [status])

    return (
        <Form>
            {touched.user && errors.user && <p className="error">{errors.user}</p>}
            <Field type="text" name="user" placeholder="Name"></Field>

            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <Field type="email" name="email" placeholder="Email"></Field>

            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password"></Field>

            {touched.terms && errors.terms && <p className="error">{errors.terms}</p>}
            <Field type="checkbox" name="terms"></Field>

            <button type="submit">Submit</button>

            {data.map((data) => (
                <div>User: {data.user}</div>
            ))}
            
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
    }),

    handleSubmit: (values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
            .then((res) => {
                setStatus(res.data)
            })
            .catch((err) => {
                console.log('Error:', err);
            })
    }
})(UserForm);

