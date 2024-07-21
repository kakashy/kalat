import type { AllIDBKalas } from '$lib/types';

export function hexToHsl(hex: string) {
	let r = 0,
		g = 0,
		b = 0;
	if (hex.length == 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length == 7) {
		r = parseInt(hex[1] + hex[2], 16);
		g = parseInt(hex[3] + hex[4], 16);
		b = parseInt(hex[5] + hex[6], 16);
	}

	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;

	if (max != min) {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h * 360, s * 100, l * 100];
}

export function sortColorsByHue(colors: AllIDBKalas) {
	return colors.sort((a, b) => {
		const [hueA] = hexToHsl(a.id);
		const [hueB] = hexToHsl(b.id);
		return hueA - hueB;
	});
}

function getBrightness(hex: string) {
	let r = 0,
		g = 0,
		b = 0;
	if (hex.length == 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length == 7) {
		r = parseInt(hex[1] + hex[2], 16);
		g = parseInt(hex[3] + hex[4], 16);
		b = parseInt(hex[5] + hex[6], 16);
	}
	return (r * 299 + g * 587 + b * 114) / 1000;
}

export function getTextColor(hex: string) {
	return getBrightness(hex) > 128 ? 'text-black' : 'text-white';
}
