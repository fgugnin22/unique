import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const MainPage = () => {
  //В этом окне(у нас страница) неавторизованный пользователь может просмотреть мероприятия, отфильтровав их по направлению или по дате.
  //Информация для просмотра: логотип, название мероприятия, направление мероприятия, дата.
  //Кроме того,  с главного окна пользователь может перейти к  авторизации или подробной информации по каждому мероприятию.
  const [allEvents, setAllEvents] = useState<any>(undefined);
  const [input, setInput] = useState<any>("");
  useEffect(() => {
    fetch(`${serverURL}/api/event/`)
      .then((r) => r.json())
      .then((data) => setAllEvents(data));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl m-4">Главная страница</h1>
      <label className="m-3">Поиск мероприятия по названию или по дате: </label>
      <input
        className="mb-3 border border-gray-600 rounded-lg p-1 focus:text-white focus:bg-accent"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        name="input"
        value={input}
      />
      {allEvents &&
        allEvents
          ?.filter((e) => {
            if (input.length === 0) {
              return true;
            }
            return (
              e.name.toLowerCase().includes(input.toLowerCase()) ||
              e.starts.toLowerCase().includes(input.toLowerCase())
            );
          })
          .map((e, i) => (
            <Link
              to={`/event/${e.id}`}
              className="w-72 overflow-clip border rounded-lg border-gray-600 px-4 py-2 m-2 hover:bg-slate-200 transition block"
              key={i}
            >
              <img
                alt="Лого мероприятия"
                width={100}
                className=" rounded-xl mx-auto"
                src={`${serverURL + "/assets/images/events/" + e?.photo}`}
              />
              <p>{e.name}</p>
              <p>Дата: {e.starts}</p>
            </Link>
          ))}
    </div>
  );
};

export default MainPage;
