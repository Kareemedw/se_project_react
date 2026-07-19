import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser?.name, currentUser?.avatar]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateProfile({
      name,
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
        <input
          className="modal__input"
          id="profile-username"
          type="text"
          name="username"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          required
        />
      </label>

      <label className="modal__label" htmlFor="profile-avatar">
        Avatar URL
        <input
          className="modal__input"
          id="profile-avatar"
          type="url"
          name="avatar"
          value={avatar}
          onChange={(evt) => setAvatar(evt.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
