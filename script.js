
const config = [
  { name: "STANDART", price: 1550, img: "xrent1.png" },
  { name: "PREMIUM", price: 1955, img: "xrent2.png" },
  { name: "X", price: 2450, img: "xrent3.png" },
  { name: "COMPACT", price: 1660, img: "xrent4.png" }
];

function getCoefficient(days) {
  if (days <= 2) return 1.0;
  if (days === 3) return 0.8;
  if (days > 3 && days < 7) {
    return 0.8 - ((days - 3) / (7 - 3)) * (0.8 - 0.7);
  }
  if (days === 7) return 0.7;
  if (days > 7 && days < 30) {
    return 0.7 - ((days - 7) / (30 - 7)) * (0.7 - 0.5);
  }
  return 0.5;
}

function renderCatalog() {
  const container = document.getElementById("catalog");
  config.forEach(cfg => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = cfg.img;
    image.alt = cfg.name;

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

    const button = document.createElement("button");
    button.textContent = "Оформить аренду";
    button.onclick = () => {
      window.open("https://t.me/XRent_msk", "_blank");
    };

    const updateTotal = () => {
      const days = parseInt(range.value);
      const coef = getCoefficient(days);
      const price = Math.round(cfg.price * coef * days);
      total.textContent = `Аренда на ${days} дн. — ${price} ₽`;
    };

    range.oninput = updateTotal;
    updateTotal();

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(range);
    card.appendChild(total);
    card.appendChild(button);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderCatalog);
