import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";
import { getUser, logout } from "./store/auth";
import { useEffect } from "react";
const serverURL = import.meta.env.VITE_SERVER_URL;

const Layout = () => {
  // Здесь ссылка на страницу с авторизацией, header и footer
  //  В качестве учетных данных необходимо использовать IdNumber и Password.
  //При вводе корректных данных пользователь должен перейти в «Окно организатора», «Окно участника», «Окно модератора», «Окно жюри».
  // Для обеспечения безопасности реализуйте CAPTCHA(4 символа и графический шум) и блокировку системы на 10 секунд
  //в случае неправильного ввода учетных данных после трех попыток входа.
  // Кроме этого, необходимо реализовать запоминание учетных данных пользователя.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userDetails, isAuthenticated } = useAppSelector((s) => s.user);
  const access = localStorage.getItem("access");
  useEffect(() => {
    if (access) {
      dispatch(getUser(access));
    }
  }, [window.location]);

  return (
    <div className="max-w-screen h-screen flex flex-col text-center">
      <nav className="h-12 bg-secondary-bg rounded-r-lg flex flex-row">
        <Link to="/">
          <img
            className="m-1 inline float-left"
            width={40}
            src={`${serverURL}/assets/images/logo.png`}
          />
        </Link>
        <Link to="/juries" className="p-3 hover:underline ml-auto">
          Список жюри
        </Link>
        {userDetails?.is_staff && (
          <>
            <Link
              to="/organizer_window"
              className="p-3 hover:underline ml-auto"
            >
              Окно организатора
            </Link>
            <Link to="/create_event" className="p-3 hover:underline ml-auto">
              Создать мероприятие
            </Link>
            <Link
              to="/organizer_profile"
              className="p-3 hover:underline ml-auto"
            >
              Мой профиль
            </Link>
          </>
        )}
        {isAuthenticated ? (
          <button
            className=" p-3 rounded-lg bg-accent text-white hover:bg-blue-900 ml-auto"
            onClick={() => dispatch(logout())}
          >
            Выйти
          </button>
        ) : (
          <button
            className=" p-3 rounded-lg bg-accent text-white hover:bg-blue-900  ml-auto"
            onClick={() => navigate(`/auth`)}
          >
            Войти
          </button>
        )}
      </nav>
      <Outlet />
      <footer className="h-12 bg-secondary-bg mt-auto text-center p-3">
        fedorgugnin22@gmail.com
      </footer>
    </div>
  );
};

export default Layout;
