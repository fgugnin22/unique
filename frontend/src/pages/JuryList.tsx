import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const JuryList = () => {
  //Сессия 2
  //     Реализуйте интерфейс для просмотра информации о жюри/модераторах: фото, ФИО, e-mail, роль.
  //     При просмотре жюри и модераторов возможен поиск по фамилии или мероприятию.
  // Кроме того система должна выводить общее количество записей.
  // Данное окно позволяет организатору перейти к регистрации жюри/модераторов

  const [juries, setJuries] = useState<any>(undefined);
  useEffect(() => {
    fetch(`${serverURL}/api/juries/`)
      .then((r) => r.json())
      .then((data) => setJuries(data));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl m-4">Список жюри</h1>
      <label className="m-3"></label>

      {juries &&
        juries.map((e, i) => (
          <div
            className="w-72 overflow-clip border rounded-lg border-gray-600 px-4 py-2 m-2 hover:bg-slate-200 transition"
            key={i}
          >
            <p>{e.name}</p>
          </div>
        ))}
    </div>
  );
};

export default JuryList;
