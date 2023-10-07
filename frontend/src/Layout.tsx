import React from "react";
import { Outlet } from "react-router-dom";
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
  return (
    <div>
      <h1>THIS IS LAYOUT</h1>
      <Outlet />
      <h3>THIS IS LAYOUIT TOO</h3>
    </div>
  );
};

export default Layout;
