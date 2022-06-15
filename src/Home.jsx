import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Checkbox,
  Icon,
  Table,
  Modal,
  Header,
  Button,
  Input,
} from "semantic-ui-react";
import axios from "axios";

import Paginations from "./components/Paginations";

const List = () => {
  const [userData, setUserData] = useState([]);
  const [editId, seteditId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isChecked, setIsChecked] = useState([]);
  const [edit, setEdit] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  //   Get user information from api
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        // set the data into state variable
        setUserData(res.data);
      });
  }, []);

  // Delete User function
  const deleteUser = (id) => {
    setUserData(userData.filter((i) => i.id !== id));
  };

  //   Edit User Function
  const editUser = (id, name, email, role) => {
    seteditId(id);
    setName(name);
    setEmail(email);
    setRole(role);
  };
  // Save edited User
  const saveUser = (id) => {
    const edited_index = userData.findIndex((i) => i.id === id);
    if (edited_index !== -1) {
      userData[edited_index] = {
        id: id,
        name: name,
        email: email,
        role: role,
      };
      setUserData(userData);
      seteditId("");
    }
  };

  //handle check box
  const handleCheckbox = (id, name, email, role) => {
    isChecked.push({
      id: id,
      name: name,
      role,
      role,
    });
    console.log(id, isChecked);
  };

  // function findCommonElement(array1, array2) {
  //   // Loop for array1
  //   for (let i = 0; i < array1.length; i++) {
  //     // Loop for array2
  //     for (let j = 0; j < array2.length; j++) {
  //       // Compare the element of each and
  //       // every element from both of the
  //       // arrays
  //       if (array1[i].id === array2[j].id) {
  //         // Return if common element found
  //         return true;
  //       }
  //     }
  //   }

  //   // Return if no common element exist
  //   return false;
  // }

  //   Delete selected Rows
  const deleteSelectedItems = () => {
    // var intersect = findCommonElement(userData, isChecked);
    // console.log("common", intersect);
    // let data = [...userData]
    // userData.forEach((i)=>{
    //   data = data.filter((j)=> j.id !== i.id)
    // })
    // console.log(userData);


    // let data = [...isChecked];
    // userData.forEach((i) => {
    //   data = data.filter((j) => j.id !== i.id);
    // });
    // const newuserData = isChecked;


    // for (let i = 0; i < userData.length; i++) {
    //   for (let j = 0; j < isChecked.length; j++) {
    //     if (userData[i].id === isChecked[j].id) {
           
    //       //  setUserData(test)
          
    //         userData.splice(i, 1)
    //     }
    //     console.log(userData);
      
    //   }
    // }

    // const deleted_users = userData.filter((i)=> i.id ?'true':'false')
    // console.log("del users",deleted_users);
  };

  // Get only 10 rows of posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);
  //   Filter to show only the first 10 rows of the data
  // const filter = userData.filter((i) => i.id < 11);

  // Search filter
  const filtered = currentPosts.filter((i) => {
    if (search === "") {
      return i;
    } else if (i.name.toLowerCase().includes(search.toLocaleLowerCase())) {
      return i;
    }
  });

  // Change Page
  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <Input
        type="text"
        style={{ width: "80%" }}
        className="mt-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* {name} || {email} || {role} */}
      <>
        <Table singleLine textAlign="center">
          <Table.Header className="fullWidth">
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {filtered.map((i) => (
            <Fragment key={i.id}>
              {editId === i.id ? (
                <Table.Body key={i.id}>
                  <Table.Row>
                    <Table.Cell></Table.Cell>

                    <Table.Cell>
                      <input onChange={(e) => setName(e.target.value)} />
                    </Table.Cell>
                    <Table.Cell>
                      <input onChange={(e) => setEmail(e.target.value)} />
                    </Table.Cell>
                    <Table.Cell>
                      <input onChange={(e) => setRole(e.target.value)} />
                    </Table.Cell>

                    <Table.Cell>
                      <Icon className="save" onClick={(e) => saveUser(i.id)} />
                      <Icon
                        className="trash"
                        onClick={(e) => deleteUser(i.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ) : (
                //   <Edit
                //     deleteUser={deleteUser}
                //     editUser={editUser}
                //     edit_name={edit_name}
                //     edit_email={edit_email}
                //     edit_role={edit_role}
                //     i={i}
                //   />
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {" "}
                      <Checkbox
                        onChange={(e) =>
                          handleCheckbox(i.id, i.name, i.email, i.role)
                        }
                        value={i.id}
                        checked={i.isChecked}
                      />{" "}
                    </Table.Cell>
                    <Fragment>
                      {}

                      <Table.Cell>{i?.name}</Table.Cell>
                      <Table.Cell>{i?.email}</Table.Cell>
                      <Table.Cell>{i?.role}</Table.Cell>
                    </Fragment>

                    <Table.Cell>
                      <Icon
                        className="edit"
                        onClick={(e) => editUser(i.id, i.name, i.email, i.role)}
                      />
                      <Icon
                        className="trash"
                        onClick={(e) => deleteUser(i.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
                //   <StaticForm deleteUser={deleteUser} editUser={editUser} i={i} newData={newData} />
              )}
            </Fragment>
          ))}
        </Table>

        <Button
          size="mini"
          onClick={() => deleteSelectedItems()}
          className="btn"
        >
          Delete Selected
        </Button>
        {/* Pagination */}
        <Paginations
          postsPerPage={postsPerPage}
          totalPosts={userData.length}
          paginate={paginate}
        />
      </>
    </div>
  );
};

export default List;
{
  /* <Fragment>
<Table.Cell>{i?.name}</Table.Cell>
<Table.Cell>{i?.email}</Table.Cell>
<Table.Cell>{i?.role}</Table.Cell>
</Fragment> */
}
