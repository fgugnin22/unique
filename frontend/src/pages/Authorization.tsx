import { useState } from "react";
import { login } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
const Authorization = () => {
  //  В качестве учетных данных необходимо использовать IdNumber и Password.
  //При вводе корректных данных пользователь должен перейти в «Окно организатора», «Окно участника», «Окно модератора», «Окно жюри».
  // Для обеспечения безопасности реализуйте CAPTCHA(4 символа и графический шум) и блокировку системы на 10 секунд
  //в случае неправильного ввода учетных данных после трех попыток входа.
  // Кроме этого, необходимо реализовать запоминание учетных данных пользователя.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginFail, isAuthenticated, userDetails } = useAppSelector(
    (state) => state.user
  );
  const [formState, setFormState] = useState({
    idNumber: "",
    password: "",
  });
  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    await dispatch(login(formState));
    if (isAuthenticated) {
      if (userDetails?.is_staff) {
        return navigate("/organizer_profile");
      }
      if (userDetails?.is_jury) {
        return navigate("/");
      }
      if (userDetails?.is_mod) {
        return navigate("/moderator_dashboard");
      }
      return navigate("/");
    }
  };
  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center bg-main-bg w-full text-center">
      <form
        onSubmit={submitHandler}
        className="w-[50%] mx-auto mt-24 rounded border flex flex-col"
      >
        <h2 className="text-2xl m-4">Авторизация</h2>
        <label className="text-left mx-3">Введите ваш идентификатор: </label>
        <input
          type="text"
          className={`p-3 m-3 rounded-lg bg-secondary-bg focus:bg-accent focus:text-white ${
            loginFail ? "bg-red-500" : ""
          }`}
          onChange={handleChange}
          required
          placeholder="Уникальный id участника"
          name="idNumber"
        />
        <label className="text-left mx-3">Введите пароль: </label>
        <input
          type="password"
          className={`p-3 m-3 rounded-lg bg-secondary-bg focus:bg-accent focus:text-white ${
            loginFail ? "bg-red-500" : ""
          }`}
          onChange={handleChange}
          required
          placeholder="Пароль"
          name="password"
        />
        <button
          className="px-4 py-2 bg-secondary-bg rounded hover:bg-teal-600 transition-colors"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Authorization;
