import React, { ChangeEvent, useEffect, useState } from "react";
const serverURL = import.meta.env.VITE_SERVER_URL;

const CreateEvent = () => {
  //   name
  // starts
  // duration_days
  // description
  // city
  // photo

  const [juries, setJuries] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    fetch(`${serverURL}/api/juries/`)
      .then((res) => res.json())
      .then((data) => {
        setJuries(data);
      });
  }, []);
  const [formState, setFormState] = useState({
    name: "",
    starts: "",
    duration_days: "",
    description: "",
    city: "",
    photo: undefined
  });
  const [activityState, setActivityState] = useState({
    name1: "",
    starts1: "",
    jury1: "",
    name2: "",
    starts2: "",
    jury2: "",
    name3: "",
    starts3: "",
    jury3: "",
    firstActivityStartTime: {
      hours: 0,
      minutes: 0
    }
  });
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetch(`${serverURL}/api/city/`)
      .then((r) => r.json())
      .then((data) => setCities(data));
  }, []);
  const handleActivityChange = (e: ChangeEvent) => {
    if (e.target.name.slice(0, "starts1".length) === "starts1") {
      const [hours, minutes] = e.target.value.split(":");
      setActivityState((prev) => ({
        ...prev,
        firstActivityStartTime: { hours, minutes }
      }));
    }
    setActivityState((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };
  const handleTextChange = (e: ChangeEvent) => {
    setFormState((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };
  const firstActivityDate = new Date(0);
  firstActivityDate.setHours(
    Number(activityState.firstActivityStartTime.hours) + 1
  );
  firstActivityDate.setMinutes(
    Number(activityState.firstActivityStartTime.minutes) + 45
  );
  const thirdActivityStart = new Date(
    "00:00:1970 " + firstActivityDate.toTimeString().slice(0, 5)
  );
  thirdActivityStart.setHours(firstActivityDate.getHours() + 1);
  thirdActivityStart.setMinutes(firstActivityDate.getMinutes() + 45);
  const handleAbominationSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(formState, activityState);
    const body = JSON.stringify({
      activityState,
      formState
    });
    await fetch(`${serverURL}/api/event/`, {
      method: "POST",
      body,
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        "Content-Type": "application/json"
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl mt-4">Создание Мероприятия</h1>
      <form onSubmit={handleAbominationSubmit}>
        <section className="mx-auto min-w-[50%] lg:w-[50%]">
          <div className="flex flex-row">
            <label className="block mr-auto  ">
              Введите название мероприятия
            </label>
            <input
              required
              placeholder="Название"
              onChange={handleTextChange}
              className="border ml-auto h-6 w-48"
              value={formState.name}
              name="name"
            />
          </div>
          <div className="flex flex-row">
            <label className="block mr-auto  ">Дата начала мероприятия</label>
            <input
              required
              onChange={handleTextChange}
              className="border block ml-auto  h-6 w-48"
              type="date"
              value={formState.starts}
              name="starts"
            />
          </div>
          <div className="flex flex-row">
            <label className="block mr-auto  ">
              Длительность мероприятия(в днях)
            </label>
            <input
              required
              placeholder="3"
              onChange={handleTextChange}
              className="border block ml-auto  h-6 w-48"
              type="number"
              value={formState.duration_days}
              name="duration_days"
            />
          </div>
          <div className="flex flex-row">
            <label className="block mr-auto ">Описание мероприятия</label>
            <textarea
              required
              placeholder="Описание"
              onChange={handleTextChange}
              className=" text-start border block ml-auto w-[60%] h-36"
              value={formState.description}
              name="description"
            />
          </div>
          <div className="flex flex-row">
            <label className="block mr-auto ">Город</label>
            <select
              required
              onChange={handleTextChange}
              value={formState.city}
              name="city"
              className="border block ml-auto h-6 w-48"
            >
              {cities.map((city) => (
                <option value={city.name} key={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <h2 className="text-xl">Активности</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3>Наименование</h3>
            <input
              required
              onChange={handleActivityChange}
              value={activityState.name1}
              type="text"
              name="name1"
              className="h-8 border block w-full"
            />
            <input
              required
              onChange={handleActivityChange}
              value={activityState.name2}
              type="text"
              name="name2"
              className="h-8 border block w-full"
            />
            <input
              required
              onChange={handleActivityChange}
              value={activityState.name3}
              type="text"
              name="name3"
              className="h-8 border block w-full"
            />
          </div>
          <div>
            <h3>Время</h3>
            <input
              required
              placeholder="9:00"
              onChange={handleActivityChange}
              value={activityState.starts1}
              name="starts1"
              className="h-8 border block w-full"
            />

            <select
              required
              onChange={handleActivityChange}
              value={activityState.starts2}
              name="starts2"
              className="h-8 border block w-full"
            >
              <option key="-1" value={undefined}></option>{" "}
              <option key="1">
                {firstActivityDate.getHours() +
                  ":" +
                  firstActivityDate.getMinutes() !==
                "NaN:NaN"
                  ? firstActivityDate.getHours() +
                    ":" +
                    firstActivityDate.getMinutes()
                  : "Некорректное время"}
              </option>
            </select>
            <select
              required
              onChange={handleActivityChange}
              value={activityState.starts3}
              name="starts3"
              className="h-8 border block w-full"
            >
              <option key="-1" value={undefined}></option>{" "}
              <option key="1">
                {thirdActivityStart.getHours() +
                  ":" +
                  thirdActivityStart.getMinutes() !==
                "NaN:NaN"
                  ? thirdActivityStart.getHours() +
                    ":" +
                    thirdActivityStart.getMinutes()
                  : "Некорректное время"}
              </option>
            </select>
          </div>
          <div>
            <h3>Жюри</h3>
            <select
              required
              onChange={handleActivityChange}
              value={activityState.jury1}
              name="jury1"
              className="h-8 border block w-full"
            >
              <option key="-1" value={undefined}></option>
              {juries.map((j) => (
                <option key={"c" + j.id}>{j.name}</option>
              ))}
            </select>

            <select
              required
              onChange={handleActivityChange}
              value={activityState.jury2}
              name="jury2"
              className="h-8 border block w-full"
            >
              <option key="-1" value={undefined}></option>
              {juries.map((j) => (
                <option key={"b" + j.id}>{j.name}</option>
              ))}
            </select>
            <select
              required
              onChange={handleActivityChange}
              value={activityState.jury3}
              name="jury3"
              className="h-8 border block w-full"
            >
              <option key="-1" value={undefined}></option>
              {juries.map((j) => (
                <option key={"a" + j.id}>{j.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="px-8 py-4 border border-gray-600 bg-slate-200 hover:bg-slate-300 transition rounded-lg m-8"
          type="submit"
        >
          Создать мероприятие
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
