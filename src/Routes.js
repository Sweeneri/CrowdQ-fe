import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import CreateAccount from "./pages/createAccount/Create-Account";
import Account from "./pages/account/Account";
import CreateSession from "./pages/session/CreateSession/CreateSession";
import JoinSession from "./pages/session/JoinSession/JoinSession";
import ViewSession from "./pages/session/ViewSession/ViewSession";


export const RoutesQ = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/account" element={<Account />} />
            <Route path="/session/create" element={<CreateSession />} />
            <Route path="/session/join" element={<JoinSession />} />
            <Route path="/session/:id" element={<ViewSession />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}