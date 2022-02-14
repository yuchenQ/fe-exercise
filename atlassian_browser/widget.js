import { fetchData } from './data.js';

const mainElement = document.querySelector('#main');

const fetchAndPrintData = async () => {
  const dataset = await fetchData();

  const recursion = (data, { level } = { level: 0 }) => {
    const { name, children } = data;

    const rawEle = document.createElement('li');
    // if indent we add css padding
    if (level) {
      rawEle.style.marginLeft = `${16 * level}px`;
    }

    rawEle.textContent = name;
    mainElement.appendChild(rawEle);

    if (children) {
      // if children, arrow
      rawEle.style.listStyleType = '"▼"';

      children.forEach(child => {
        recursion(child, { level: level + 1 });
      });
    }
  };

  for (const data of dataset) {
    recursion(data);
  }
};

fetchAndPrintData();