import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchBlog, IBlog } from "../redux/blog/blogSlice";
import AddBlog from "./add.blog";
import DeleteModal from "./delete.modal";

const BlogTable = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog.listBlog);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState<IBlog | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //   const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  return (
    <>
      <AddBlog
        show={showModal}
        onClose={() => setShowModal(false)}
        blogs={editBlog}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        blog={editBlog}
      />

      <Button
        variant="primary"
        onClick={() => {
          setShowModal(true);
          setEditBlog(null);
        }}
      >
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.content}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowModal(true);
                    setEditBlog(blog);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Handle delete action
                    setEditBlog(blog);
                    setShowDeleteModal(true);
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

export default BlogTable;
