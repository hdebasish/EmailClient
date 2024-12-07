import { useValue } from "./context/EmailProvider.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import EmailList from "./pages/emailList/EmailList.jsx";
import Loading from "./pages/loading/Loading.jsx";
import Error from "./pages/error/Error.jsx";
import "./App.css"



function App() {

  const { isLoadingEmailList, errorMailList } = useValue();


  return (
    <div className="App">
      {isLoadingEmailList ? <Loading /> : errorMailList ? <Error/> : <><Navbar /> <EmailList /></>}
    </div>
  );
}

export default App;
