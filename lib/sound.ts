
// Simple retro sound synthesizer using Web Audio API

type SoundType = 'click' | 'success' | 'coin' | 'error' | 'start';

let audioCtx: AudioContext | null = null;

const getContext = () => {
    if (!audioCtx) {
        // Handle browser differences (webkitAudioContext for Safari) if strictly needed, 
        // but AudioContext is widely supported now.
        const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
        if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
};

export const playSfx = (type: SoundType) => {
    const ctx = getContext();
    if (!ctx) return;

    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
        case 'click':
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;

        case 'coin':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.setValueAtTime(1600, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;

        case 'success':
            osc.type = 'triangle';
            // Simple Arpeggio: C - E - G
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6

            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

            osc.start(now);
            osc.stop(now + 0.6);
            break;

        case 'error':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.2);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;

        case 'start':
            osc.type = 'square';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.linearRampToValueAtTime(880, now + 0.5);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
            break;
    }
};
