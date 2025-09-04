import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UsersTable from "./user.table";
import BlogTable from "./blog.table";

const TabsContent = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="user"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="user" title="User">
          <UsersTable />
        </Tab>
        <Tab eventKey="blog" title="Blogs">
          <BlogTable />
        </Tab>
      </Tabs>
    </>
  );
};

export default TabsContent;
