'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../features/auth/authSlice';
import useAuthSession from '../hooks/useAuthSession';

const route = 'pages/api/auth/login';

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useAuthSession();
  const [loading, setLoading] = useState(false);

  return (
    <div id="app" className="flex justify-center items-center h-screen bg-zinc-100 dark:bg-zinc-800">
      <div className="w-full max-w-md">
        {user ? (
          <div className="bg-white dark:bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-center text-2xl font-bold text-zinc-700 dark:text-zinc-200 mb-4">Welcome, {user.username}</h2>
          </div>
        ) : (
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string().required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setLoading(true);
              try {
                const response = await axios.post('/api/auth/login', values);
                dispatch(login(response.data));
                toast.success('Login successful!');
              } catch (error) {
                toast.error('Login failed. Please check your credentials.');
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            <Form id="loginForm" className="bg-white dark:bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-200 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? 'Logging in...' : 'Sign In'}
                </button>
                <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Forgot Password?
                </a>
              </div>
            </Form>
          </Formik>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
