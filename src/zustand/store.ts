import create from "zustand";
import AppStoreState from "../types";

export const useStore = create<AppStoreState>(
  (set, get): AppStoreState => ({
    currentUser: null,
    movies: [],
    favorites: [],
    receiver: null,
    movie: null,
    comment: "",
    theme: false,
    saveReceiver: null,
    saveSender: null,
    setCurrentUser: (data) => {
      set({ currentUser: data });
    },
    setMovies: (data) => {
      set({ movies: data });
    },
    setFavorites: (data) => {
      set({ favorites: data });
    },
    setReceiver: (data) => {
      set({ receiver: data });
    },
    setMovie: (data) => {
      set({ movie: data });
    },
    setComment: (data) => {
      set({ comment: data });
    },
    setTheme: (data) => {
      set({ theme: data });
    },
    setSaveReceiver: (data) => {
      set({ saveReceiver: data });
    },
    setSaveSender: (data) => {
      set({ saveSender: data });
    },
  })
);
