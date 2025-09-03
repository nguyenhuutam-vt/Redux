import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchUser, IUser } from "../redux/user/userSlice";
import { Bounce, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import EditModal from "./edit.modal";
const UsersTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUser);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={editUser}
      />
      <Button
        variant="primary"
        onClick={() => {
          setEditUser(null);
          setShowEditModal(true);
        }}
      >
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th> Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditUser(user);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Handle delete action
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UsersTable;
