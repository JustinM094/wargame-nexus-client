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

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="creategame" element={<CreateGame />} />
        <Route path="gamesevents" element={<GamesAndEvents />} />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
