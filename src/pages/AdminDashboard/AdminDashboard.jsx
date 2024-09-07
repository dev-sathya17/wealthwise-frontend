import { useLoaderData } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";
const AdminDashboard = () => {
  const { role } = useLoaderData();
  return (
    <>
      <Navbar role={role} />
    </>
  );
};

export default AdminDashboard;
