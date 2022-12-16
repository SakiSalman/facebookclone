import React from "react";
import { useState } from "react";
import cross from "../_assets/icons/cross.png";
import {useDispatch} from 'react-redux'
import createToast from "../Utility/toast";
import { userRegister } from "../redux/Auth/action";
import { useNavigate } from "react-router-dom";


  // all days
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

  // Months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec']

  // Years
  const years = Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - i);

  // curent date and day
  const date = new Date()
  
const RegisterModal = ({ setModal }) => {

  const navigate = useNavigate()

  const diaspatch = useDispatch()
  // States
  const [input, setInput] = useState({
    f_name: "",
    s_name: "",
    mobile: "",
    auth: "",
    password: "",
    day : date.getDate(),
    month : months[date.getMonth()],
    year : date.getFullYear(),
    gender : ''
  });

  const [validate, setValidate] = useState({
    f_name: false,
    s_name: false,
    auth: false,
    password: false,
  });

  const [validateMsg, setValidateMsg] = useState({
    f_name: false,
    s_name: false,
    auth: false,
    password: false,
  })

  // Input update
  const handleInputChange = (e) => {
    const field_name = e.target.name;
    setValidateMsg((prev) => ({
      ...prev,
      [field_name]: false,
    }))

    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  /**
   * Validate inputs
   */
  const handleInputValidate = (e) => {
    const field_name = e.target.name;
    if (!input[field_name]) {
      setValidateMsg((prev) => ({
        ...prev,
        [field_name]: false,
      }))
      setValidate((prev) => ({
        ...prev,
        [field_name]: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        [field_name]: false,
      }));
    }
  };
/**
 * Handle input focus
 * @param {*} e 
 */
  const handleInputValidatefocus = (e) => {
    const field_name = e.target.name;
    setValidateMsg((prev) => ({
      ...prev,
      [field_name]: true
    }))
   };

  /**
   * form submit handler
   *
   */
  const handleuserSubmit = async (e) => {
    e.preventDefault()

    if (!input.f_name || !input.s_name || !input.auth || !input.gender || !input.year || !input.month || !input.day) {
      createToast('error', 'All Fields are Required!')
    }else{
      
     diaspatch(userRegister({
      first_name: input.f_name,
      sur_name: input.s_name,
      auth: input.auth,
      password: input.password,
      gander: input.gender,
      birth_date: input.day,
      birth_month: input.month,
      birth_year: input.year
     }, setModal, navigate))
     
    }
  };

  return (
    <>
      <div className="blur-box">
        <div className="sign-up-card">
          <div className="sign-up-header">
            <div className="sign-up-content">
              <span>Sign Up</span>
              <span>It's quick and easy.</span>
            </div>
            <button onClick={(e) => setModal(false)}>
              <img src={cross} alt="" />
            </button>
          </div>
          <div className="sign-up-body">
            <form action onSubmit={handleuserSubmit}>
              <div className="reg-form reg-form-inline">
                <input
                  className={validate.f_name && "error-border"}
                  onBlur={handleInputValidate}
                  name="f_name"
                  onChange={handleInputChange}
                  onFocus={handleInputValidatefocus}
                  type="text"
                  value={input.f_name}
                  placeholder="First Name"
                />
                 {
                validateMsg.f_name &&  <div className="validate-error f-name-validate">
                <span>What's Your Name?</span>
                <span className="error-angle"></span>
              </div>
               }
                <input
                  name="s_name"
                  onBlur={handleInputValidate}
                  className={validate.s_name && "error-border"}
                  onChange={handleInputChange}
                   onFocus={handleInputValidatefocus}
                  type="text"
                  value={input.s_name}
                  placeholder="Surname"
                />
              
               {
                validateMsg.s_name &&  <div className="validate-error s-name-validate">
                <span>What's Your Name?</span>
                <span className="error-angle"></span>
              </div>
               }
              </div>
              <div className="reg-form">
                <input
                  name="auth"
                  onBlur={handleInputValidate}
                  className={validate.auth && "error-border"}
                  onChange={handleInputChange}
                   onFocus={handleInputValidatefocus}
                  type="text"
                  value={input.auth}
                  placeholder="Mobile number or email address"
                />
                {
                validateMsg.auth &&  <div className="validate-error f-name-validate">
                <span>What's your email?</span>
                <span className="error-angle"></span>
              </div>
               }
              </div>
              <div className="reg-form">
                <input
                  name="password"
                  onBlur={handleInputValidate}
                  className={validate.password && "error-border"}
                  onChange={handleInputChange}
                  onFocus={handleInputValidatefocus}
                  type="text"
                  value={input.password}
                  placeholder="New password"
                />
                 {
                validateMsg.password &&  <div className="validate-error f-name-validate">
                <span>What's your password?</span>
                <span className="error-angle"></span>
              </div>
               }
              </div>
              <div className="reg-form">
                <span>Date of birth</span>
                <div className="reg-form-select">
                  <select onChange={handleInputChange} name="day" id="day">
                    
                    {
                      days.map( (items, index) =>                 

                      <option selected={items === input.day ? true : false} key={index} value={items}>{items}</option>

                      )
                    }
                  </select>
                  <select name="month" onChange={handleInputChange} id="month">
                  {
                      months.map( (items, index) =>                 

                      <option selected={ items === input.month ? true : false} key={index} value={items}>{items}</option>

                      )
                    }
                  </select>
                  <select onChange={handleInputChange} name="year" id>
                  {
                      years.map( (items, index) =>                 

                      <option key={index} value={items}>{items}</option>

                      )
                    }
                  </select>
                </div>
              </div>
              <div className="reg-form">
                <span>Gender</span>
                <div className="reg-form-select">
                  <label>
                    Female
                    <input onChange={handleInputChange} value="female" type="radio" name="gender" />
                  </label>
                  <label>
                    Male
                    <input onChange={handleInputChange} value="male" type="radio" name="gender" />
                  </label>
                  <label>
                    Custom
                    <input onChange={handleInputChange} value="custom" type="radio" name="gender" />
                  </label>
                </div>
              </div>
              <div className="reg-form">
                <p>
                  People who use our service may have uploaded your contact
                  information to Facebook. <a href="#">Learn more.</a>
                </p>
              </div>
              <div className="reg-form">
                <p>
                  By clicking Sign Up, you agree to our <a href="#">Terms</a>,{" "}
                  <a href="#">Privacy Policy</a> and{" "}
                  <a href="#">Cookies Policy</a>. You may receive SMS
                  notifications from us and can opt out at any time.
                </p>
              </div>
              <div className="reg-form">
                <button>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
