import { useState } from "react";
import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/alerts";
import { API } from "../../../public/config";
import { Layout } from "../../../components/Layout";

const forgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    token: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });
  const { email, buttonText, success, error } = state;

  const handleChange = (e) => {
    setState({ ...state, email: e.target.value, error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API}/forgot-password`, { email });
      //   console.log("forgot password", response);
      setState({
        ...state,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      console.log("forgot password error", error);
      setState({
        ...state,
        buttonText: "Forgot Password",
        error: error.response.data.error,
      });
    }
  };

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          onChange={handleChange}
          value={email}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Forgot Password</h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          {passwordForgotForm()}
        </div>
      </div>
    </Layout>
  );
};

export default forgotPassword;
