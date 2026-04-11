import { removeVietnameseTones } from './removeVietnameseTones';

export function generateSkuBase(name: string): string {
  const clean = removeVietnameseTones(name)
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .trim();

  const words = clean.split(/\s+/);

  // lấy chữ cái đầu + giữ từ quan trọng
  const prefix = words
    .slice(0, 3)
    .map((w) => w[0])
    .join('');

  return prefix; // ví dụ: NTT
}
