import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

// type Stock = {
//   id: number;
//   symbol: string;
//   companyName: string;
//   purchase: number;
// };

function App() {
  // const [stocks, setStocks] = useState<Stock[]>([]);
  // const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   const fetchStocks = async () => {
  //     try {
  //       const response = await fetch("/api/PlaceholderStock");

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setStocks(data);
  //     } catch (error) {
  //       setError("Failed to fetch stocks");
  //       console.error("Error fetching stocks:", error);
  //     }
  //   };

  //   //fetchStocks();
  // }, []);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
