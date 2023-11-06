import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const List = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8001/api/users");
      setUsersData(result.data.results);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete("http://127.0.0.1:8001/api/usersdelete/" + id);
    const newUsersData = usersData.filter((item) => {
      return item.id !== id;
    });
    setUsersData(newUsersData);
  };

  return (
    <div className="conatiner">
      <h3>DATA LENGKAP</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Lengkap</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="btn-group">
                    <NavLink to={`/view/${user.id}`} className="btn btn-success">
                      View
                    </NavLink>
                    <NavLink to={`/edit/${user.id}`} className="btn btn-info">
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
