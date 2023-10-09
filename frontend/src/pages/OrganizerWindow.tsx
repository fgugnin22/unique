import { useAppSelector } from "../store/store";
import { Link } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const OrganizerWindow = () => {
  //     Реализуйте интерфейс для работы организатора мероприятий.
  //При входе система приветствует пользователя по имени  и отчеству
  //с указанием времени работы:
  // 9.00-11.00 – Утро
  // 11.01-18.00 – День
  // 18.01 – 24.00 – Вечер
  // При входе в систему подгружается фото пользователя.
  const { userDetails } = useAppSelector((state) => state.user);
  const timeOfTheDay = new Date().getHours();
  let timeString = "Доброго времени суток!";
  if (9 <= timeOfTheDay && timeOfTheDay < 11) {
    timeString = "Доброе утро!";
  } else if (11 <= timeOfTheDay && timeOfTheDay < 18) {
    timeString = "Добрый день!";
  } else if (18 <= timeOfTheDay && timeOfTheDay <= 23) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timeString = "Добрый вечер!";
  }
  return (
    <div>
      <h1 className="text-3xl m-8">Окно организатора</h1>
      <div className="border border-black w-full"></div>
      <section className="flex flex-row gap-12 m-4 h-96">
        <div className="w-96 flex items-center justify-evenly flex-col border border-gray-600 rounded">
          <img
            className="w-64 m-8 rounded-lg"
            src={`${serverURL}/${userDetails?.photo}`}
          />
          <Link
            className="px-8 py-4 border border-gray-600 bg-slate-200 hover:bg-slate-300 transition rounded-lg w-64  block m-8"
            to={"/organizer_profile"}
          >
            Мой Профиль
          </Link>
        </div>
        <div className=" flex items-center flex-col border border-gray-600 rounded mx-12 grow">
          <h2 className="mt-8 text-xl">{timeString}</h2>
          <h2 className=" text-xl">{userDetails?.name}</h2>
          <Link
            className="px-12 w-48 py-4 rounded-lg mt-6  border border-gray-600 bg-slate-200 hover:bg-slate-300 transition"
            to={"/"}
          >
            Мероприятия
          </Link>
          <Link
            className="px-12 w-48 py-4 rounded-lg mt-6  border border-gray-600 bg-slate-200 hover:bg-slate-300 transition"
            to={""}
          >
            Участники
          </Link>
          <Link
            className="px-12 w-48 py-4 rounded-lg mt-6  border border-gray-600 bg-slate-200 hover:bg-slate-300 transition"
            to={"/juries"}
          >
            Жюри
          </Link>
        </div>
        <div className="xl:w-96 sm:w-0"></div>
      </section>
    </div>
  );
};

export default OrganizerWindow;
