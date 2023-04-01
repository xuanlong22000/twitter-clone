import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegister";
import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   const onSubmit = useCallback(() => {
  //     try {
  //       setIsLoading(true);

  //       registerModal.onClose();
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, [registerModal]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Your account created !");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //   const onToggle = useCallback(() => {
  //     if (isLoading) return;
  //     registerModal.onClose();
  //     loginModal.onOpen();
  //   }, [isLoading, registerModal, loginModal]);

  const onToggle = () => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />

      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account {" -> "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create a account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
