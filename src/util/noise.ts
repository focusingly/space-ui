export const createNoise = async (colorStr: string, width: number = 128, height: number = 128) => {
  const t = colorStringToRgb(colorStr);
  if (!t) {
    throw new TypeError(`colorStr: ${colorStr} is not a legal color string(rgb, hsl #xxx)`);
  }
  const [r, g, b] = t;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get canvas context");
  }
  [canvas.width, canvas.height] = [width, height];

  // 设置背景色为传入的 RGB 颜色
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, width, height);

  // 添加纸张噪点效果
  const noiseDensity = 0.1; // 噪点的密度 (相对较高)
  const noiseSize = 1; // 噪点的大小
  const noiseRange = 8; // 噪点颜色与背景色的偏移范围，保持细微的变化
  const textureNoiseSize = 1; // 纹理噪点的大小，模拟纸张质感

  for (let i = 0; i < width * height * noiseDensity; i++) {
    const x = (Math.random() * width) | 0;
    const y = (Math.random() * height) | 0;
    // 生成与输入颜色相邻的噪点颜色
    const noiseR = Math.min(255, Math.max(0, r + ((Math.random() * noiseRange) | 0) - noiseRange));
    const noiseG = Math.min(255, Math.max(0, g + ((Math.random() * noiseRange) | 0) - noiseRange));
    const noiseB = Math.min(255, Math.max(0, b + ((Math.random() * noiseRange) | 0) - noiseRange));
    ctx.fillStyle = `rgb(${noiseR}, ${noiseG}, ${noiseB})`;
    ctx.fillRect(x, y, noiseSize, noiseSize);
  }

  // 添加纸张纹理
  const textureDensity = 0.2; // 纹理颗粒密度 (可以较低)
  for (let i = 0; i < width * height * textureDensity; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    // 生成与背景颜色相近的纸张纹理噪点
    const textureOffset = Math.random() * 5; // 轻微的颜色变化
    const textureR = Math.min(255, Math.max(0, r + textureOffset) | 0);
    const textureG = Math.min(255, Math.max(0, g + textureOffset) | 0);
    const textureB = Math.min(255, Math.max(0, b + textureOffset) | 0);

    const textureColor = `rgb(${textureR}, ${textureG}, ${textureB})`;
    ctx.fillStyle = textureColor;
    ctx.fillRect(x, y, textureNoiseSize, textureNoiseSize);
  }

  // 将画布内容转为 Base64 编码的图像
  return canvas.toDataURL();
};

export const colorStringToRgb = (color: string): [number, number, number] | null => {
  // 去除颜色字符串的空格并转换为小写
  color = color.trim().toLowerCase();
  // 匹配 RGB 格式，如 rgb(255, 255, 255)
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  const rgbMatch = color.match(rgbRegex);
  if (rgbMatch) {
    return [
      Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10))),
      Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10))),
      Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)))
    ];
  }
  // 匹配 HSL 格式，如 hsl(0, 100%, 50%)
  const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
  const hslMatch = color.match(hslRegex);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10) / 360;
    const s = parseInt(hslMatch[2], 10) / 100;
    const l = parseInt(hslMatch[3], 10) / 100;
    // HSL 转 RGB
    const r = hslToRgb(h, s, l);
    return [Math.round(r[0] * 255), Math.round(r[1] * 255), Math.round(r[2] * 255)];
  }
  // 匹配 Hex 格式，如 #fff 或 #ffffff
  const hexRegex = /^#([0-9a-f]{3}){1,2}$/;
  const hexMatch = color.match(hexRegex);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join(""); // 将 #fff 转为 #ffffff
    }
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return [r, g, b];
  }

  // 如果无法识别格式，返回 null
  return null;
};

// HSL 转 RGB 的辅助函数
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // 无饱和度时，RGB相等
  } else {
    const temp2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const temp1 = 2 * l - temp2;
    r = hueToRgb(temp1, temp2, h + 1 / 3);
    g = hueToRgb(temp1, temp2, h);
    b = hueToRgb(temp1, temp2, h - 1 / 3);
  }

  return [r, g, b];
};

// 用于将 HSL 转换为 RGB 的辅助函数
export const hueToRgb = (temp1: number, temp2: number, h: number): number => {
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (6 * h < 1) return temp1 + (temp2 - temp1) * 6 * h;
  if (2 * h < 1) return temp2;
  if (3 * h < 2) return temp1 + (temp2 - temp1) * (2 / 3 - h) * 6;
  return temp1;
};
