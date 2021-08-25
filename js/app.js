'use strict';

let productOne = document.getElementById('images').children[0];
let productTwo = document.getElementById('images').children[1];
let productThree = document.getElementById('images').children[2];
let totalClicks = 0;
let maxClicks = 25;
let allProducts = [];
let indexArray = [];
let imageCount = 6;
let div = document.getElementById('images');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `../assets/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function getRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function assignImage(productElement, productIndex) {
  productElement.src = allProducts[productIndex].src;
  productElement.title = allProducts[productIndex].name;
  allProducts[productIndex].views++;
}
function render() {
  while (indexArray.length < imageCount) {
    let random = getRandom();
    while (!indexArray.includes(random)) {
      indexArray.push(random);
    }
  }

  let productOneIndex = indexArray.shift();
  let productTwoIndex = indexArray.shift();
  let productThreeIndex = indexArray.shift();

  assignImage(productOne, productOneIndex);
  assignImage(productTwo, productTwoIndex);
  assignImage(productThree, productThreeIndex);
}

function handleImageClicks(e) {
  if (e.target === div) {
    alert('Please click on one of the images below.');
  }
  totalClicks++;
  let clickeditem = e.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (clickeditem === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  render();
  if (maxClicks === totalClicks) {
    div.removeEventListener('click', handleImageClicks);
    renderChart();
  }
}

div.addEventListener('click', handleImageClicks);

render();

function renderChart() {
  let names = [];
  let views = [];
  let clicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
    views.push(allProducts[i].views);
    clicks.push(allProducts[i].clicks);
  }
  let chartStuff = {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Views',
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Clicks',
        data: clicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, chartStuff);
}
