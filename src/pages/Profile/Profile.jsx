import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import { IoCloudUpload } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import userServices from "../../services/user.service";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../features/user/userSlice";
import BACKEND_URL from "../../utils/config";

const Profile = () => {
  const { user } = useLoaderData();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    image: user.image,
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUserStart());
    userServices
      .updateUser(user.userId, updatedUser)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          console.log(response);
          dispatch(updateUserSuccess(response.data.user));
          setModalOpen(false);
          user.name = response.data.user.name;
          user.email = response.data.user.email;
          user.mobile = response.data.user.mobile;
        } else {
          alert(response);
          dispatch(updateUserFailure(response));
        }
      })
      .catch((err) => {
        dispatch(updateUserFailure(err.message));
        console.error(err);
      });
  };

  const handleDelete = () => {
    const choice = confirm(`Are you sure you want to delete your account?`);
    if (choice) {
      dispatch(deleteUserStart());
      userServices
        .deleteUser(user.user.userId)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            dispatch(deleteUserSuccess());
            navigate("/");
          } else {
            alert(response);
            dispatch(deleteUserFailure(response));
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(deleteUserFailure(error.message));
          alert(error.message);
        });
    }
  };

  if (user) {
    user.image = user.image.replace("\\", "/");
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const uploadImage = () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    dispatch(updateUserStart());
    userServices
      .uploadImage(data, user.userId)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          dispatch(updateUserSuccess(response.data.user));
          user.image = response.data.user.image;
          setImageUrl(null);
        } else {
          alert(response);
          dispatch(updateUserFailure(response));
        }
      })
      .catch((err) => {
        dispatch(updateUserFailure(err.message));
        console.error(err);
      });
  };

  return (
    <>
      <Navbar role={user.role} active={"profile"} />
      <div className="profile-container">
        <div className="profile-card">
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="profile-image">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" />
              ) : (
                <img
                  src={`${BACKEND_URL}/${user.image}`}
                  alt={user.firstName}
                />
              )}
            </div>
            <div className="camera-icon">
              {!imageUrl ? (
                <>
                  <FaCamera onClick={handleIconClick} />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <IoCloudUpload className="upload-icon" onClick={uploadImage} />
              )}
            </div>

            <div className="profile-details">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="prof-input"
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="prof-input"
              />

              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                className="prof-input"
              />

              <div className="profile-actions">
                <button
                  type="button"
                  className="update-btn"
                  onClick={() => setModalOpen(true)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Mobile:
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={() => handleUpdate(formData)}
              >
                Save
              </button>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
