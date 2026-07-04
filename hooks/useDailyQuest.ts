"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/store";
import { generateDailyQuest } from "@/lib/generator";

export function useDailyQuest() {
    const { dailyQuest, weeklyPlan, level, setDailyQuest } = useGameStore();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayKey = days[new Date().getDay()];
    const todayPlan = weeklyPlan?.[todayKey];
    const isBossLevel = level % 10 === 0;
    const musclesKey = todayPlan?.muscles?.join(',');

    useEffect(() => {
        if (todayPlan?.isActive && todayPlan.muscles.length > 0 && !dailyQuest && !isBossLevel) {
            const smartQuest = generateDailyQuest(todayPlan.muscles);
            setDailyQuest(smartQuest);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todayKey, todayPlan?.isActive, musclesKey, isBossLevel, dailyQuest, setDailyQuest]);

    return { dailyQuest, isBossLevel, todayPlan };
}
