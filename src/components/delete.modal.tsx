import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser, IUser } from "../redux/user/userSlice";
import { useAppDispatch } from "../redux/hook";
import { Bounce, toast } from "react-toastify";
import { deleteBlog, IBlog } from "../redux/blog/blogSlice";

interface IProps {
  show: boolean;
  onClose: () => void;
  user?: IUser | null;
  blog?: IBlog | null;
}

function DeleteModal(props: IProps) {
  const { show, onClose, user, blog } = props;
  const dispatch = useAppDispatch();

  const handleDelete = (id: number | undefined) => {
    // Dispatch delete action
    if (user) {
      dispatch(deleteUser(id!));
    } else if (blog) {
      dispatch(deleteBlog(id!));
    }
    toast("User deleted successfully!", {
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
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete(user ? user.id : blog ? blog.id : 0);
            }}
          >
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
