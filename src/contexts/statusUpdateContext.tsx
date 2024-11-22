import React, { createContext, useContext, useState } from "react";

type StatusUpdateContextType = {
    lastUpdated: string;
    setLastUpdated: (date: string) => void;
};

const StatusUpdateContext = createContext<StatusUpdateContextType | undefined>(undefined);

export const useStatusUpdateContext = () => {
    const context = useContext(StatusUpdateContext);
    if (!context) {
        throw new Error("useStatusUpdateContext deve ser usado dentro de StatusUpdateProvider");
    }
    return context;
};

export const StatusUpdateProvider = ({ children }: { children: React.ReactNode }) => {
    const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());

    return (
        <StatusUpdateContext.Provider value={{ lastUpdated, setLastUpdated }}>
            {children}
        </StatusUpdateContext.Provider>
    );
};
