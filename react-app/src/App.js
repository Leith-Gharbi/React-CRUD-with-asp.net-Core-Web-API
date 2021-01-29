import logo from './logo.svg';
import './App.css';

// for using store 
import { store } from "./actions/store";
import{Provider} from "react-redux";
import DCandidates from './components/DCandidates';
///// 
import { Container } from "@material-ui/core";
function App() {
  return (
   <Provider store={store}>
     <Container maxWidth="lg">
<DCandidates></DCandidates>
</Container>
   </Provider>
  );
}

export default App;
