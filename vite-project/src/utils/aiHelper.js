export function getGiftSuggestionsFromPrompt(products, prompt) {
  const lower = prompt.toLowerCase();

  let categories = [];
  let scoreMap = new Map();

  // 🎯 Budget detection
  let budget = null;
  const match = lower.match(/(\d+)/);
  if (match) budget = Number(match[1]);

  // 🎯 Occasion
  if (lower.includes("birthday")) categories.push("hampers", "bouquet", "embroidery");
  if (lower.includes("wedding")) categories.push("wall", "lippan", "hampers");
  if (lower.includes("anniversary")) categories.push("embroidery", "wall");
  if (lower.includes("gift")) categories.push("hampers", "bouquet");

  // 🎯 Person-based AI
  if (lower.includes("girlfriend")) categories.push("bouquet", "embroidery", "crochet");
  if (lower.includes("boyfriend")) categories.push("hampers", "wall");
  if (lower.includes("mom")) categories.push("lippan", "wall", "embroidery");
  if (lower.includes("friend")) categories.push("crochet", "bouquet");

  // fallback
  if (!categories.length) {
    categories = ["hampers", "embroidery", "crochet", "lippan", "wall"];
  }

  // 🎯 FILTER + SCORE
  const results = products.filter((p) => {
    const categoryMatch = categories.some((c) =>
      p.category.toLowerCase().includes(c)
    );

    const budgetMatch = budget ? p.price <= budget : true;

    if (categoryMatch && budgetMatch) {
      // 🧠 SCORING SYSTEM
      let score = 0;

      // category match = high score
      if (categoryMatch) score += 5;

      // closer to budget = higher score
      if (budget) {
        score += Math.max(0, 5 - Math.abs(budget - p.price) / 500);
      }

      // keywords in title
      if (lower.includes("custom") && p.title.toLowerCase().includes("custom"))
        score += 3;

      scoreMap.set(p.id, score);
      return true;
    }

    return false;
  });

  // 🎯 SORT BY BEST MATCH
  results.sort((a, b) => scoreMap.get(b.id) - scoreMap.get(a.id));

  return results;
}