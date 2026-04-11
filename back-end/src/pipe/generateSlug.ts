import { removeVietnameseTones } from './removeVietnameseTones';

export function generateSlug(name: string): string {
  return removeVietnameseTones(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
