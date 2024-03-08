import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
 
const Dashboard = () => {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9002/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  const navigateToAddUser = () => {

    navigate("/signup");
  };
  return (
    <>
      <input onClick={navigateToAddUser} className="adduser bg-green-600 text-white rounded-md px-4 py-2 ml-2" type="button" value="+ Add User"></input>
      <div className="mt-4">
        <div className="row1 bg-gray-800 text-white w-3/4 mx-auto py-2">
          <table className="w-full">
            <thead id="headerfile" className="bg-blue-900">
              <tr>
           
                <th className="gender px-6">MAIL</th>
              </tr>
            </thead>
            <tbody id="check1">
              {users.map((user, index) => (
                <tr key={index}>
                 
                  <td className="px-6">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
