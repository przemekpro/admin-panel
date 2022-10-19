import "./style/App.css"
import Table from "./components/Table";
import {Routes, Route} from "react-router-dom"
import AddNewUser from "./components/AddNewUser";
import Header from "./components/Header";
import EditUser from "./components/EditUser";




export default function App() {
  return (
    <div className="app--wrapper">
      <Header />
      <Routes>
        <Route exact path="/"  element={<Table />}></Route>
        <Route path="/newuser" element={<AddNewUser />}></Route>
        <Route path="/edituser" element={<EditUser />}></Route>
      </Routes>
    </div>
  )
}

