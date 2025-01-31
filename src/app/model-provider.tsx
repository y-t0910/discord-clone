"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CreateChannelModal } from "../components/modals/create-channel-modal";

export const ModalContext = createContext({
    isMounted: false,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <ModalContext.Provider value={{ isMounted }}>
            {children}
            <CreateChannelModal />
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};