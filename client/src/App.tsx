import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function App() {
  return (
    <Router basename="/busdriver"> {/*basename*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;