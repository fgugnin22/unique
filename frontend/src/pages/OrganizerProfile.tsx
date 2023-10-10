import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { modifyUserCredentials } from "../store/auth";

const OrganizerProfile = () => {
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    birth_date: "",
    phone_number: undefined,
    email: "",
    old_password: "",
    new_password: "",
    re_new_password: ""
  });
  const handleTextChange = (e: ChangeEvent) => {
    setFormState((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };
  const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (formState.new_password !== formState.re_new_password) {
      return;
    }
    await dispatch(modifyUserCredentials(formState));
    window.location.reload();
  };
  return (
    <div className="w-full flex flex-col items-center m-8">
      <h1 className="text-3xl">Мой профиль</h1>
      <form
        onSubmit={handleFormSubmit}
        className="w-full flex items-center flex-col"
      >
        <div>
          <div className="flex flex-row ml-4 mt-8">
            <div className="grid grid-cols-1">
              <p className="ml-auto my-2 leading-8">ФИО:</p>
              <p className="ml-auto my-2 leading-8">Пол:</p>
              <p className="ml-auto my-2 leading-8">Дата рождения:</p>
              <p className="ml-auto my-2 leading-8">Идентификатор:</p>
              <p className="ml-auto my-2 leading-8">Страна:</p>
              <p className="ml-auto my-2 leading-8">Телефон</p>
              <p className="ml-auto my-2 leading-8">Email:</p>
              <p className="ml-auto my-2 leading-8">Старый пароль:</p>
              <p className="ml-auto my-2 leading-8">Новый пароль:</p>
              <p className="ml-auto my-2 leading-8">Повторите новый пароль:</p>
            </div>
            <div className="grid grid-cols-1">
              <input
                value={formState.name}
                onChange={handleTextChange}
                name="name"
                type="text"
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                placeholder={`${userDetails?.name}`}
              />
              <p className="focus:bg-accent focus:text-white h-6 mt-3 mb-1 ml-4 text-left">
                {userDetails?.sex === "m" ? "Мужской" : "Женский"}
              </p>
              <input
                value={formState.birth_date}
                onChange={handleTextChange}
                name="birth_date"
                type="date"
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                placeholder={`${userDetails?.birth_date}`}
              />
              <p className="focus:bg-accent focus:text-white h-6 mt-3 mb-1 ml-4">
                {userDetails?.idNumber}
              </p>
              <p className="focus:bg-accent focus:text-white h-6 mt-3 mb-1 ml-4 text-left">
                {userDetails?.country.name}
              </p>
              <input
                value={formState.phone_number}
                onChange={handleTextChange}
                type="number"
                name="phone_number"
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                placeholder={`${userDetails?.phone_number}`}
              />
              <input
                value={formState.email}
                onChange={handleTextChange}
                name="email"
                type="email"
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                placeholder={`${userDetails?.email}`}
              />
              <input
                value={formState.old_password}
                onChange={handleTextChange}
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                name="old_password"
                type={!showPass ? "password" : "text"}
                placeholder="Старый пароль"
                required
              />
              <input
                value={formState.new_password}
                onChange={handleTextChange}
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                name="new_password"
                type={!showPass ? "password" : "text"}
                placeholder="Оставьте пустым, если не хотите менять"
              />
              <input
                value={formState.re_new_password}
                onChange={handleTextChange}
                className="focus:bg-accent focus:text-white border mt-3 mb-1 ml-4 h-6 "
                name="re_new_password"
                type={!showPass ? "password" : "text"}
                placeholder="Повторите новый пароль"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="3">Показать пароль</label>
          <input
            checked={showPass}
            onChange={(e) => {
              setShowPass((p) => !p);
            }}
            className="mx-2 mt-2"
            id="3"
            type="checkbox"
          />
        </div>
        <button className="px-48 py-3 m-2 hover:bg-slate-400 transition border border-gray-600 bg-slate-300 rounded-lg">
          Сохранить
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default OrganizerProfile;
