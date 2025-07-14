
const config = [
  { name: "STANDART", price: 1550 },
  { name: "PREMIUM", price: 1955 },
  { name: "X", price: 2450 },
  { name: "COMPACT", price: 1660 },
];

function getCoefficient(days) {
  if (days <= 2) return 1.0;
  if (days <= 6) return 0.8;
  if (days <= 13) return 0.7;
  if (days <= 29) return 0.7;
  return 0.5;
}

function renderCatalog() {
  const container = document.getElementById("catalog");
  config.forEach(cfg => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = cfg.name;

    const range = document.createElement("input");
    range.type = "range";
    range.min = 1;
    range.max = 30;
    range.value = 1;

    const total = document.createElement("div");
    total.className = "total";
    const updateTotal = () => {
      const days = parseInt(range.value);
      const coef = getCoefficient(days);
      const price = Math.round(cfg.price * coef * days);
      total.textContent = `Аренда на ${days} дн. — ${price} ₽`;
    };

    range.oninput = updateTotal;
    updateTotal();

    card.appendChild(title);
    card.appendChild(range);
    card.appendChild(total);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderCatalog);
