"use client";

import React from 'react';
import { useEffect, useState } from "react";
import { CreateChannelModal } from "../components/modals/create-channel-modal";

interface ModalProviderProps {
  children?: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <CreateChannelModal />;
};

// モジュールとして認識されるようにデフォルトエクスポートを追加
export default ModalProvider;
