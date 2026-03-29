// src/utils/aiHelper.js
export function getGiftSuggestionsFromPrompt(products, prompt) {
  const lower = prompt.toLowerCase();
  let categories = [];

  // Budget extraction
  let budget = null;
  const match = lower.match(/\bunder\s*(\d+)/);
  if (match) budget = Number(match[1]);

  // Occasion keywords
  if (lower.includes("birthday")) categories.push("hampers", "embroidery");
  if (lower.includes("wedding")) categories.push("hampers", "wall hanging");
  if (lower.includes("friend")) categories.push("crochet", "embroidery");
  if (lower.includes("handmade")) categories.push("crochet", "lippan");

  // Fallback
  if (!categories.length)
    categories = ["hampers", "embroidery", "crochet", "lippan", "wall hanging"];

  return products.filter((p) => {
    const inCategory = categories.some(c => c.toLowerCase() === p.category.toLowerCase());
    const matchesBudget = budget ? p.price <= budget : true;
    return inCategory && matchesBudget;
  });
}