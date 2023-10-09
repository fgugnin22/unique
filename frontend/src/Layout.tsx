import React from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { getUser } from "./store/auth";
type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[];
};
const Layout = (props: LayoutProps) => {
  // Здесь ссылка на страницу с авторизацией, header и footer
  //  В качестве учетных данных необходимо использовать IdNumber и Password.
  //При вводе корректных данных пользователь должен перейти в «Окно организатора», «Окно участника», «Окно модератора», «Окно жюри».
  // Для обеспечения безопасности реализуйте CAPTCHA(4 символа и графический шум) и блокировку системы на 10 секунд
  //в случае неправильного ввода учетных данных после трех попыток входа.
  // Кроме этого, необходимо реализовать запоминание учетных данных пользователя.
  console.log(props);
  const dispatch = useAppDispatch();
  const access = localStorage.getItem("access");
  if (access) {
    dispatch(getUser(access));
  }
  return (
    <div className="w-screen h-screen flex flex-col text-center">
      <nav className="h-12 bg-secondary-bg">NAV</nav>
      <Outlet />
      <footer className="h-12 bg-secondary-bg mt-auto text-center">
        Footer
      </footer>
    </div>
  );
};

export default Layout;
