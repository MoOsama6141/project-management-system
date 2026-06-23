import { Toaster } from "sonner";
import "./App.css";
import IndexRouter from "./app/router";

function App() {
  return (
    <>
      <IndexRouter />
      <Toaster />
    </>
  );
}

export default App;
