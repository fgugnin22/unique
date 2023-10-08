import Layout from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddEvent from "./pages/AddEvent";
import Authorization from "./pages/Authorization";
import EventDetails from "./pages/EventDetails";
import EventKanban from "./pages/EventKanban";
import JuryList from "./pages/JuryList";
import JuryRegistration from "./pages/JuryRegistration";
import MainPage from "./pages/MainPage";
import ModeratorDashBoard from "./pages/ModeratorDashBoard";
import MyActivities from "./pages/MyActivities";
import OrganizerProfile from "./pages/OrganizerProfile";
import ParticipantRegistration from "./pages/ParticipantRegistration";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/addevent" element={<AddEvent></AddEvent>}></Route>
            <Route
              path="/auth"
              element={<Authorization></Authorization>}
            ></Route>
            <Route
              path="/event/:id"
              element={<EventDetails></EventDetails>}
            ></Route>
            <Route
              path="/event/:id/kanban"
              element={<EventKanban></EventKanban>}
            ></Route>
            <Route path="/juries" element={<JuryList></JuryList>}></Route>
            <Route
              path="/jury_registration"
              element={<JuryRegistration></JuryRegistration>}
            ></Route>
            <Route path="/" element={<MainPage></MainPage>}></Route>
            <Route
              path="/moderator_dashboard"
              element={<ModeratorDashBoard></ModeratorDashBoard>}
            ></Route>
            <Route
              path="/my_activites"
              element={<MyActivities></MyActivities>}
            ></Route>
            <Route
              path="/organizer_profile"
              element={<OrganizerProfile></OrganizerProfile>}
            ></Route>
            <Route
              path="/participant_registration"
              element={<ParticipantRegistration></ParticipantRegistration>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
