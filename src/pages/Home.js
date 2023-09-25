import { useEffect } from "react";

import { useState } from "react";

import React from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
export default function Home() {
    const[Users,setUsers]=useState([]);
    const{id}=useParams();
    useEffect(() => {                 //this executes everytime page is rendered
     
    loadUsers();
    
    },[]);                           //if we dont give empty array it will run unlimited times

    const loadUsers= async()=>{      //async used to run js line by line
        const result=await axios.get("http://localhost:8080/users"); //api call
        setUsers(result.data);        //result.data contains the required data in array form
    }
    const deleteUser= async(id)=>{
      await axios.delete(`http://localhost:8080/user/${id}`)
      loadUsers();
    }
    
  return (
    <div className="container">
        <div className="py-4">
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col" className="text-center">Action</th>
    </tr>
  </thead>
  <tbody>
    {
    Users.map((user,index)=>(
    <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td><Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
        <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
        <button className="btn btn-danger mx-2" onClick={()=> deleteUser(user.id)}>Delete</button></td>
      </tr>
      ))
  
    }
  </tbody>
</table>
        </div>
      
    </div>
  )
}
