import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector( state => state.auth)
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login islemi basarili.");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login islemi basarisiz oldu.");
      console.log(error);
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const logout = async () => {
    dispatch(fetchStart());

    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
        headers: { Authorization: `Token ${token}` },
      });
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Cikis islemi basarisiz oldu.");
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;
