import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../views/Dashboard";
import { Startup } from "../views/Startup";
import ChoroplethMap from "../views/MapTest";
import { CreateItinerary } from "../views/CreateItinerary";

interface RouterProps {
  auth: boolean;
}

export const Router: React.FC<RouterProps> = ({ auth }) => {
  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/createItinerary" element={<CreateItinerary/>} />
        </>
      ) : (
        <>
          <Route path="/*" element={<Startup />} />
        </>
      )}
    </Routes>
  );
};
