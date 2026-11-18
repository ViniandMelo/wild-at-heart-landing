import { useEffect, useRef } from 'react';

const FRAME_COUNT = 201;
const FRAME_PATH = '/ezgif-499be590cf295bef-optimized/';
const FRAME_EASE = 0.32;

export function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = document.getElementById('home');
    const context = canvas?.getContext('2d');
    if (!canvas || !hero || !context) return;

    const frames = new Map<number, HTMLImageElement>();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let targetFrame = 0;
    let currentFrame = 0;
    let drawnFrame = -1;
    let renderRequest = 0;

    const scheduleRender = () => {
      if (!renderRequest) {
        renderRequest = window.requestAnimationFrame(animate);
      }
    };

    const loadFrame = (index: number) => {
      const cachedFrame = frames.get(index);
      if (cachedFrame) return cachedFrame;

      const image = new Image();
      frames.set(index, image);
      image.onload = () => {
        if (Math.round(currentFrame) === index) drawnFrame = -1;
        scheduleRender();
      };
      image.onerror = () => {
        console.error(`Não foi possível carregar o quadro ${index === 0 ? 'inicial' : index}.`);
      };
      image.src = index === 0
        ? `${FRAME_PATH}hero.png`
        : `${FRAME_PATH}ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
      return image;
    };

    const drawFrame = (index: number) => {
      const image = loadFrame(index);
      if (!image.complete || !image.naturalWidth) return;

      const scale = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height,
      );
      context.fillStyle = 'rgba(0, 0, 0, 0.55)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      drawnFrame = index;
    };

    const updateScrollTarget = () => {
      const progress = Math.max(
        0,
        Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight),
      );
      targetFrame = prefersReducedMotion
        ? 0
        : Math.round(progress * (FRAME_COUNT - 1));
      scheduleRender();
    };

    function animate() {
      renderRequest = 0;
      const difference = targetFrame - currentFrame;
      currentFrame = prefersReducedMotion || Math.abs(difference) < 0.05
        ? targetFrame
        : currentFrame + difference * FRAME_EASE;

      const frame = Math.round(currentFrame);
      const direction = Math.sign(targetFrame - currentFrame);
      const image = loadFrame(frame);
      if (image.complete && image.naturalWidth > 0 && frame !== drawnFrame) {
        drawFrame(frame);
      }

      const nextFrame = frame + direction;
      if (nextFrame >= 0 && nextFrame < FRAME_COUNT) loadFrame(nextFrame);

      for (const [cachedIndex, cachedImage] of frames) {
        if (Math.abs(cachedIndex - frame) > 4 && cachedImage.complete) {
          frames.delete(cachedIndex);
        }
      }

      if (Math.abs(targetFrame - currentFrame) >= 0.05) scheduleRender();
    }

    const resizeCanvas = () => {
      const scale = Math.min(
        window.devicePixelRatio || 1,
        1920 / window.innerWidth,
        1080 / window.innerHeight,
      );
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      drawnFrame = -1;
      scheduleRender();
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    loadFrame(0);
    updateScrollTarget();

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', resizeCanvas);
      if (renderRequest) window.cancelAnimationFrame(renderRequest);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block h-screen w-full"
    />
  );
}
