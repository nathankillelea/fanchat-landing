import React, {useState} from 'react';
import './App.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from "firebase/app";
import "firebase/firestore";
import tilt from './assets/phone-tilt.png';
import phone from './assets/phone.png';

let firebaseConfig = {
  apiKey: "AIzaSyATxICEk1ESEIVEV3B_CXjCuOcvs1X252E",
  authDomain: "fanchat-landing.firebaseapp.com",
  databaseURL: "https://fanchat-landing.firebaseio.com",
  projectId: "fanchat-landing",
  storageBucket: "fanchat-landing.appspot.com",
  messagingSenderId: "469068500331",
  appId: "1:469068500331:web:7b8177c1587d1158f3502e",
  measurementId: "G-XRWZMBYS4F"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function App() {
  const [submitted, setSubmitted] = useState(false);

  const submit = async (input) => {
    await db.collection("emails").doc(input.email).set({email: input.email});
  }

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .email('Invalid email')
      .max(255, 'Too long!'),
  });

  return (
    <div className="app">
      <div className="diagonalBox">
        <div className="content">
          <header>
            <h1><strong>fanchat</strong> is a subscription-based messaging platform for influencers and their fans.</h1>
          </header>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={emailSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              submit(values);
              actions.setSubmitting(false);
              setSubmitted(true);
            }}
          >
            {({ handleChange, setFieldTouched, handleSubmit, isSubmitting, values, errors, touched }) => (
              <form onSubmit={handleSubmit} noValidate="novalidate" style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                {
                  !submitted ?
                  <div className="formContainer">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <button type="submit" disabled={isSubmitting}>
                      Get Notified
                    </button>
                  </div>
                  :
                  <div className="registeredContainer">
                    <h2 className="registeredText">Thank you for registering! We will reach out once early access is available.</h2>
                  </div>
                }
                {errors.email && touched.email ? <p className="errorText">Invalid Email</p> : null}
              </form>
            )}
          </Formik>
        </div>
      </div>
      <img src={phone} className="phone" alt="fanchat application" />
      <img src={tilt} className="tilt" alt="fanchat application" />
    </div>
  );
}

export default App;
