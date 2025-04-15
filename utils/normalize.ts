import { Package } from "https://deno.land/x/xeorarchx@v3.1.0/search.ts";

const normalize = (pack: Package): string => {
  if (pack.type === "aur") {
    if (pack.url) return pack.url;
    else return `https://aur.archlinux.org/packages/${pack.name}`;
  }

  if (pack.type === "std") {
    if (pack.url) return pack.url;
    else {
      return `https://archlinux.org/packages/${pack.repo}/${pack.arch}/${pack.name}`;
    }
  }

  return "https://archlinux.org/";
};

export default normalize;
