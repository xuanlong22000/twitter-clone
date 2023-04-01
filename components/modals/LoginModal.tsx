import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegister";
import { signIn } from "next-auth/react";
import React, { useState, useCallback } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   const onSubmit = useCallback(() => {
  //     try {
  //       setIsLoading(true);

  //       loginModal.onClose();
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, [loginModal]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", { email, password });

      loginModal.onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  //   const onToggle = useCallback(() => {
  //     if (isLoading) return;
  //     registerModal.onOpen();
  //     loginModal.onClose();
  //   }, [isLoading, registerModal, loginModal]);

  const onToggle = () => {
    if (isLoading) return;
    registerModal.onOpen();
    loginModal.onClose();
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
        Dont have a account {" -> "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
