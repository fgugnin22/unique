import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;
const EventDetails = () => {
  const params = useParams();
  const [eventData, setEventData] = useState({});
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
        <div>
          <h1 className="text-4xl mt-12">{eventData?.name}</h1>
          <section className="w-96 m-24 border py-12 px-24 flex items-center flex-col">
            <img
              alt="Лого мероприятия"
              className="w-64 rounded-xl m-4"
              src={`${serverURL + "/" + eventData?.photo}`}
            />
            <p>Дата начала: {eventData?.starts}</p>
            <p>Город: {eventData?.city?.name}</p>
          </section>
          <section></section>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
