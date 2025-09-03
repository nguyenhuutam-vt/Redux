import { useAppDispatch, useAppSelector } from "./redux/hook";
import Header from "./components/header";
import TabsContent from "./components/tabs.content";
import UsersTable from "./components/user.table";
import { Container } from "react-bootstrap";

function App() {
  //lay store ra
  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);
  //action
  const dispatch = useAppDispatch();
  console.log(count);

  return (
    <Container>
      <Header />
      <TabsContent />
    </Container>
  );
}

export default App;
