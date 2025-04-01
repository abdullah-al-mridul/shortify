// importing packages
import { create } from "zustand";
import axiosInstance from "../api/axios";

// intializing interface for link state
interface LinkState {
  links: { [key: string]: string }[];
  addingLink: boolean;
  deletingLink: string;
  gettingLinks: boolean;
  addLink: (
    fullLink: string,
    setAddedUrl: (newState: string) => any
  ) => Promise<void>;
  getLinks: () => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
}

// creating link store
const useLinkStore = create<LinkState>((set, get) => ({
  addingLink: false,
  gettingLinks: false,
  links: [],
  deletingLink: "",
  addLink: async (fullLink, setAddedUrl) => {
    try {
      set({ addingLink: true });
      const res = await axiosInstance.post("/links/create", { link: fullLink });
      setAddedUrl(res.data.data.shortLink);
      set({
        links: [...get().links, res.data.data],
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ addingLink: false });
    }
  },
  getLinks: async () => {
    try {
      const res = await axiosInstance.get("/links/mylinks");
      set({
        links: res.data.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  },
  deleteLink: async (linkId) => {
    try {
      set({
        deletingLink: linkId,
      });
      const res = await axiosInstance.delete(`/links/${linkId}`);
      if (res.status === 200) {
        set({
          links: get().links.filter((link) => link._id !== linkId),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({
        deletingLink: "",
      });
    }
  },
}));

// exporting link store for external use
export default useLinkStore;
