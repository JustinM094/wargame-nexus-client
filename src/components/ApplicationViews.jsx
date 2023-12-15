import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { HomePage } from "./Homepage";
import { EventDetails } from "./EventDetails";
import { AllEvents } from "./AllEvents";
import { CreateGame } from "./CreateGame";
import { GamesAndEvents } from "./GamesandEvents";
import { GameDetails } from "./GameDetails";
import { Army } from "./Army";
import { ArmyDetails } from "./ArmyDetails";
import { UserProfile } from "./UserProfile";
import { CreateArmy } from "./CreateArmy";
import { EditArmy } from "./EditArmy";
import { CreateEvent } from "./CreateEvent";
import { EditGame } from "./EditGame";
import { SignUpForm } from "./SignUpForm";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/event-sign-up/:id" element={<SignUpForm />} />
          <Route path="creategame" element={<CreateGame />} />
          <Route path="gamesevents" element={<GamesAndEvents />} />
          <Route path="create-event/:id" element={<CreateEvent />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/edit-game/:id" element={<EditGame />} />
          <Route path="armies" element={<Army />} />
          <Route path="armies/:id" element={<ArmyDetails />} />
          <Route path="create-army" element={<CreateArmy />} />
          <Route path="edit-army/:id" element={<EditArmy />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
