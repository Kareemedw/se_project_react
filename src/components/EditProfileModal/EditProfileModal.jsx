import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUsername(currentUser?.username || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser?.username, currentUser?.avatar]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateProfile({
      username,
      avatar,
    });
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="profile-username">
        Name
      </label>

      <input
        className="modal__input"
        id="profile-username"
        type="text"
        name="username"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
        required
      />

      <label className="modal__label" htmlFor="profile-avatar">
        Avatar URL
      </label>

      <input
        className="modal__input"
        id="profile-avatar"
        type="url"
        name="avatar"
        value={avatar}
        onChange={(evt) => setAvatar(evt.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
