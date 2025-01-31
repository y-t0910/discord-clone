"use client";

import { useEffect, useState } from "react";
import { CreateChannelModal } from "../components/modals/create-channel-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateChannelModal />
    </>
  );
};
