import { describe, it, expect } from "vitest";
import { fisherYatesShuffle } from "../utils";

describe("fisherYatesShuffle", () => {
    it("should return an array of the same length", () => {
        const input = [1, 2, 3, 4, 5];
        const result = fisherYatesShuffle(input);
        expect(result).toHaveLength(input.length);
    });

    it("should contain the same elements", () => {
        const input = [1, 2, 3, 4, 5];
        const result = fisherYatesShuffle(input);
        expect(result.sort()).toEqual(input.sort());
    });

    it("should not mutate the original array", () => {
        const input = [1, 2, 3, 4, 5];
        const copy = [...input];
        fisherYatesShuffle(input);
        expect(input).toEqual(copy);
    });

    it("should return an empty array for empty input", () => {
        expect(fisherYatesShuffle([])).toEqual([]);
    });

    it("should return a single-element array unchanged", () => {
        expect(fisherYatesShuffle([42])).toEqual([42]);
    });
});
