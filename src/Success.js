
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Copy() {
    let history = useHistory();
    const [user, setuser] = useState([])
    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem("token");

        axios.get(`http://localhost:8500/`, { headers: { 'x-access-token': token } })
            .then(res => {
                console.log(res)
                const tableData = res.data.data
                setuser(tableData)
                console.log(user)

            })

    }
    function deleteuser(_id) {
        let token = localStorage.getItem("token");
        console.log(_id);
        axios.delete(`http://localhost:8500/${_id}`, { headers: { 'x-access-token': token } }).then((result) => {
            console.log("result.data", result);

        })

    }
    function updateuser(_id) {
        console.log(_id);
        history.push(`/user/${_id}`);

    }
    function adduser(){
        history.push('/user');

    }
    const columns = [
        {
            title: 'name', field: "name"
        },
        {
            title: "email", field: "email"
        },
        {
            title: "phone", field: 'phone'
        }
    ]

  
    return (

        <div>
       
            <MaterialTable title=" Material Table"

                data={user}
                columns={columns}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        editable: "rowData",
                        onClick: (event, rowData) => updateuser(rowData._id),


                    },

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteuser(rowData._id)

                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true ,
                        onClick: (event, rowData) => adduser(rowData.from)
                      }
                ]}
            />


        </div>
    )
}




export default Copy