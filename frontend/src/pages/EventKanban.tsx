import React, { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { useParams, useNavigate, Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const EventKanban = () => {
  // Реализуйте интерфейс для визуализации активностей мероприятия. Для нового мероприятия Kanban – доска отображает только активности,
  // время и жюри. Если в рамках какой-то активности участниками сформированы задачи,
  // то при нажатии  на активность должно появиться  немодальное окно со списком задач и ФИО участника, который эту задачу внес в активность.
  // Система должна позволить «перетаскивать» активности по экрану и располагать их по усмотрению пользователя.
  // В данном окне при выборе мероприятия из выпадающего списка возможен просмотр  Kanban-досок всех мероприятий.
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(undefined);
  const [activityDetails, setActivityDetails] = useState<[]>([]);
  const [allEvents, setAllEvents] = useState<any>(undefined);
  const [allJuries, setAllJuries] = useState<any>(undefined);
  const id = useParams().id;
  useEffect(() => {
    fetch(`${serverURL}/api/event/${id}/`)
      .then((r) => r.json())
      .then((data) => setEvent(data));
  }, [id]);
  useEffect(() => {
    fetch(`${serverURL}/api/event/`)
      .then((r) => r.json())
      .then((data) => setAllEvents(data));
  }, []);
  useEffect(() => {
    fetch(`${serverURL}/api/juries/`)
      .then((r) => r.json())
      .then((data) => setAllJuries(data));
  }, []);
  useEffect(() => {
    event && setActivityDetails(event?.activities.map((a, i) => false));
    console.log(activityDetails);
  }, [event]);
  return (
    <div>
      <h1 className="text-3xl m-4">Доска</h1>
      <div className="flex">
        <h2 className="min-w-32 w-96">Мероприятие</h2>
        <select
          onChange={(e) => {
            navigate(`/event/${e.target.value}/kanban`);
          }}
          className="w-72 border-gray-600 rounded-lg"
        >
          {allEvents?.map &&
            allEvents.map((e) => (
              <option value={e.id} key={e.id}>
                {e.name}{" "}
              </option>
            ))}
        </select>
      </div>
      <div className="mx-auto flex flex-col gap-4 w-96 h-96 m-12 flex-wrap items-center">
        {event?.activities?.length > 0 &&
          allJuries?.find &&
          event.activities.map((activity, i) => (
            <div key={activity.id}>
              <div
                className="w-52 p-2 border rounded-lg border-gray-600 hover:bg-slate-200 transition"
                key={activity.id}
                onClick={() => {
                  setActivityDetails((prev: any) => {
                    prev = [...prev];
                    prev[i] = !prev[i];
                    return prev;
                  });
                }}
              >
                <h3 className="text-lg">{activity.name}</h3>
                <p>Начало: {activity.starts.slice(0, 5)}</p>
                <p>
                  Жюри:{" "}
                  {allJuries?.find &&
                    allJuries?.find((jury) => {
                      return jury.id === activity.juries[0].user;
                    }).name}
                </p>
              </div>
              {activityDetails[i] &&
                activity.tasks.map((task) => (
                  <div key={task.id}>
                    <p>Задача: {task.name}</p>
                    <p>Инициатор: {task.creator.name}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventKanban;
