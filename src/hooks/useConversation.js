import { create } from "zustand";

export const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation: selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages: messages}),
}));