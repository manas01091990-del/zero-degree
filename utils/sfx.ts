
export const SFX_URLS = {
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  CHIME: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  WHOOSH: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
};

export const playSFX = (url: string, volume: number = 0.3) => {
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    // Standard practice for transient UI sounds
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently fail if browser blocks un-interacted audio
      });
    }
  } catch (e) {
    // Ignore errors in environments without Audio support
  }
};
