import React, { useState } from "react";
import List from "./List";
import axios from "axios";

const Home = () => {
  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
    console.log(userField);
  };

  const [loading, setLoading] = useState();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8001/api/addnew", userField);
      setLoading(true);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  if (loading) {
    return <Home/>;
  }

  return (
    <div className="container">
      <h2 class Name="w-100 d-flex justify-content-center p-3 text-center">
        React JS LARAVEL 10 API CRUD
      </h2>
      <div className="row">
        <div className="col-md-4">
          <h3>Form ISI</h3>
          <form>
            <div className="mb-3 mt-3">
              <label className="form-label"> Nama:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Masukan Nama"
                name="name"
                onChange={(e) => changeUserFieldHandler(e)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Masukan email"
                name="email"
                onChange={(e) => changeUserFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">Password:</label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Masukan password"
                name="password"
                onChange={(e) => changeUserFieldHandler(e)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onSubmitChange(e)}
            >
              Tambahkan Data
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
