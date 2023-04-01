import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUserName(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/edit`, {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      toast.success("Updated");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
        disabled={isLoading}
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit Profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    </div>
  );
};

export default EditModal;
