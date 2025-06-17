import { useContext } from "react";

import { LoadingBarContext } from "@/providers/loading-provider";

export function useLoadingBar() {
    const context = useContext(LoadingBarContext);
    if (context === undefined) {
        throw new Error("useLoadingBar must be used within a LoadingBarProvider");
    }
    return context;
};
