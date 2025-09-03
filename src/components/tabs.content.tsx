import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UsersTable from "./user.table";
import UserList from "./user";
import { Button } from "react-bootstrap";

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
          <UsersTable />
        </Tab>
      </Tabs>
    </>
  );
};

export default TabsContent;
