import { Button, Form, Modal } from "react-bootstrap";
import { createBlog, IBlog, updateBlog } from "../redux/blog/blogSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Bounce, toast } from "react-toastify";

interface IProps {
  show: boolean;
  onClose: () => void;
  blogs?: IBlog | null;
}

const AddBlog = (props: IProps) => {
  const { show, onClose, blogs } = props;
  const [title, setTitle] = useState(blogs?.title || "");
  const [author, setAuthor] = useState(blogs?.author || "");
  const [content, setContent] = useState(blogs?.content || "");
  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.blog.isCreateSuccess);

  useEffect(() => {
    setAuthor(blogs?.author || "");
    setContent(blogs?.content || "");
    setTitle(blogs?.title || "");
  }, [blogs, show]);

  const handleSave = () => {
    if (!blogs) {
      // Create new blog
      const data = { title, author, content };
      dispatch(createBlog(data));

      toast("Blog created successfully!", {
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
    } else {
      const data = { id: blogs.id, title, author, content };
      // Update existing blog
      dispatch(updateBlog(data));

      toast("Blog Update successfully!", {
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
        <Modal.Title> Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Author</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBlog;
