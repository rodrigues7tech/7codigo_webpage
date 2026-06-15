const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const canvas = document.getElementById("matrix-bg");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas instanceof HTMLCanvasElement && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const css = getComputedStyle(document.documentElement);
    const matrixColor = css.getPropertyValue("--primary").trim() || "#39ff14";
    const bgFade = "rgba(4, 7, 11, 0.08)";
    const charset = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
    const fontSize = 14;
    let drops = [];
    let columns = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
    };

    const draw = () => {
      ctx.fillStyle = bgFade;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = matrixColor;

      for (let i = 0; i < drops.length; i += 1) {
        const char = charset.charAt(Math.floor(Math.random() * charset.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    resize();
    setInterval(draw, 45);
    window.addEventListener("resize", resize);
  }
}
