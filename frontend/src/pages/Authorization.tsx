import { useEffect, useState } from "react";
import { login } from "../store/auth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

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
    password: ""
  });
  const [captcha, setCaptcha] = useState(undefined);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    if (isAuthenticated && userDetails) {
      if (userDetails?.is_staff) {
        return navigate("/organizer_window");
      }
      if (userDetails?.is_jury) {
        return navigate("/");
      }
      if (userDetails?.is_mod) {
        return navigate("/moderator_dashboard");
      }
      return navigate("/");
    }
  }, [isAuthenticated, userDetails]);
  useEffect(() => {
    fetch(`${serverURL}/api/captcha/`)
      .then((r) => r.json())
      .then((d) => {
        setCaptcha(d[new Date().getMilliseconds() % d.length]);
      });
  }, []);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (answer.toLowerCase() !== captcha.answer.toLowerCase()) {
      setError(true);
      window.location.reload();
    }
    await dispatch(login(formState));
    if (loginFail) {
      window.location.reload();
    }
  };
  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleAnswerChange = (e: any) => {
    setAnswer(e.target.value);
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
        <label>
          {error ? "Символы введены неправильно" : "Введите символы с картинки"}
        </label>
        <div className="flex flex-row items-center">
          <img
            width={150}
            className="mr-auto ml-4"
            src={`${serverURL}/assets/images/captcha/${captcha?.image}`}
          />
          <input
            required
            onChange={handleAnswerChange}
            value={answer}
            name="answer"
            className=" bg-secondary-bg focus:bg-accent focus:text-white w-32 h-8 border border-gray-600 p-1 rounded-lg mx-4 m"
          />
        </div>
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
