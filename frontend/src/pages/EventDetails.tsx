import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;
const EventDetails = () => {
  const params = useParams();
  const [eventData, setEventData] = useState<any>({});
  useEffect(() => {
    fetch(`${serverURL}/api/event/${params.id}/`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }, [params]);
  // Реализуйте интерфейс для  получения подробной информации по всем активностям:
  //лого, дата, город, организатор и описание мероприятия.
  return (
    <div>
      {eventData && (
        <div className="flex flex-col">
          <h1 className="text-4xl mt-12">{eventData?.name}</h1>
          <Link
            className="px-4 py-2 -mb-4 mt-4 border-gray-600 border rounded-lg w-32 mx-auto inline hover:bg-slate-200"
            to={`/event/${eventData?.id}/kanban`}
          >
            Перейти на доску
          </Link>
          <div className="flex flex-row">
            <section className=" w-80 m-24 py-4 px-24 flex items-center flex-col gap-y-2 border-black border-2 rounded">
              <img
                alt="Лого мероприятия"
                className="max-w-64 rounded-xl m-4"
                src={`${
                  serverURL + "/assets/images/events/" + eventData?.photo
                }`}
              />
              <span className="w-64 font-thin border rounded-lg text-sm leading-6">
                Дата начала: <p>{eventData?.starts}</p>
              </span>
              <span className="w-64 font-thin border rounded-lg text-sm leading-6">
                Город: <p>{eventData?.city?.name}</p>
              </span>
              <span className="w-64 font-thin border rounded-lg text-sm leading-6">
                Организатор: <p>{eventData?.organizer?.name}</p>
              </span>
            </section>
            <section className="w-full my-24 mx-12 py-4 px-24 flex items-center flex-col gap-y-2 border-black border-2 rounded">
              <h2 className="text-3xl m-4">Описание: </h2>
              <span>{eventData?.description}</span>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
