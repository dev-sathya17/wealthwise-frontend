import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./UserDashboard.css";
const UserDashboard = () => {
  const { role } = useLoaderData();
  return (
    <>
      <Navbar role={role} />
    </>
  );
};

export default UserDashboard;
