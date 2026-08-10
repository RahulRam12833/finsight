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
    <div className="app relative isolate min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-100">
      <svg
        className="pointer-events-none absolute top-43 left-0  -z-10 h-64 w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d=" M-50 500
      C250 -100, 450 900, 700 400
      C950 -100, 1150 900, 1490 100"
          stroke="#3B82F6"
          strokeWidth="3"
          opacity="0.40"
        />
      </svg>
      <div className="z-10">
        <UserProvider>
          <Navbar />
          <Outlet />
          <ToastContainer />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
