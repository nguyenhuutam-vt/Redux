import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createUser, IUser, updateUser } from "../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Bounce, toast } from "react-toastify";

interface IProps {
  show: boolean;
  onClose: () => void;
  user?: IUser | null;
}
const EditModal = (props: IProps) => {
  const { show, onClose, user } = props;
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  useEffect(() => {
    setEmail(user?.email || "");
    setName(user?.name || "");
  }, [user, show]);
  const handleSubmit = () => {
    if (!user) {
      const data = { name, email };
      // Gửi data lên server hoặc dispatch action
      dispatch(createUser(data));

      if (isCreateSuccess === true) {
        toast("User created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        onClose();
      }
    } else {
      const data = { id: user.id, name, email };
      // Gửi data lên server hoặc dispatch action
      dispatch(updateUser(data));

      toast("User Update successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              // value={user?.email}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              // value={user?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
