import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const register = async () => {};
  const logout = async () => {};

  return { login, register, logout };
};

export default useAuthCalls;
