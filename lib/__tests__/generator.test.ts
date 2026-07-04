import { describe, it, expect } from "vitest";
import { generateDailyRoutine } from "../generator";
import { EXERCISE_DB } from "../exercises";

describe("EXERCISE_DB", () => {
    it("should have length", () => {
        expect(EXERCISE_DB.length).toBeGreaterThan(0);
    });

    it("should work with spread to create real array", () => {
        const arr = [...EXERCISE_DB];
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBeGreaterThan(0);
        const pecho = arr.filter(e => e.muscle === "Pecho");
        expect(pecho.length).toBeGreaterThan(0);
    });
});

describe("generateDailyRoutine", () => {
    it("should return empty array for no target muscles", () => {
        expect(generateDailyRoutine([], 1)).toEqual([]);
    });

    it("should return exercises for given muscles", () => {
        const routine = generateDailyRoutine(["Pecho"], 5);
        expect(routine.length).toBeGreaterThan(0);
        routine.forEach(ex => {
            expect(ex).toHaveProperty("instanceId");
            expect(ex).toHaveProperty("config");
            expect(ex.config).toHaveProperty("sets");
            expect(ex.config).toHaveProperty("reps");
        });
    });

    it("should assign higher sets for higher level", () => {
        const lowLevel = generateDailyRoutine(["Pecho"], 1);
        const highLevel = generateDailyRoutine(["Pecho"], 10);
        const lowSets = Math.max(...lowLevel.map(ex => ex.config.sets));
        const highSets = Math.max(...highLevel.map(ex => ex.config.sets));
        expect(highSets).toBeGreaterThanOrEqual(lowSets);
    });

    it("should include filler exercises when routine is short", () => {
        const routine = generateDailyRoutine(["Pecho"], 1);
        expect(routine.length).toBeGreaterThanOrEqual(5);
    });
});
