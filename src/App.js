import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouterComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/profile" element={<PrivateRoute/>} > {/*private Route that takes a child to render it if authorized */}
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/forgot-pasword" element={<ForgotPassword/>}/>
        <Route path="/Sign-in" element={<SignIn/>}/>
        <Route path="/Sign-up" element={<SignUp/>}/>
      </Routes>
      <Navbar />
    </Router>

    <ToastContainer/>
    </>
  );
}

export default App;
