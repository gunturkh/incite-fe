import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
};

type Action = {
    setAuthenticated: (authenticated: State["authenticated"]) => void;
    setAccessToken: (accessToken: State["accessToken"]) => void;
    setRefreshToken: (refreshToken: State["accessToken"]) => void;
};
export const useAuthStore = create<State & Action, any>(
    persist(
        (set) => ({
            authenticated: false,
            accessToken: "",
            refreshToken: "",
            setAuthenticated: (data: boolean) => set(() => ({ authenticated: data })),
            setAccessToken: (token: string) => set(() => ({ accessToken: token })),
            setRefreshToken: (token: string) => set(() => ({ accessToken: token })),
        }),
        {
            name: "auth-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
