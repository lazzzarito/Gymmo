import { describe, it, expect } from "vitest";
import { useGameStore } from "../store";

describe("character store", () => {
    it("should start with default values", () => {
        const state = useGameStore.getState();
        expect(state.level).toBe(1);
        expect(state.xp).toBe(0);
    });

    it("should add xp and level up", () => {
        const store = useGameStore.getState();
        store.addXp(200);
        const state = useGameStore.getState();
        expect(state.xp).toBeGreaterThan(0);
    });

    it("should update profile", () => {
        const store = useGameStore.getState();
        store.updateProfile({ name: "TestHero" });
        const state = useGameStore.getState();
        expect(state.name).toBe("TestHero");
    });

    it("should send social messages", () => {
        const store = useGameStore.getState();
        store.sendSocialMessage({ content: "Hello!", type: "text", senderId: "me", senderName: "TestHero" });
        const state = useGameStore.getState();
        expect(state.socialMessages.length).toBeGreaterThan(0);
        expect(state.socialMessages[0].content).toBe("Hello!");
    });
});
