let ABSOLUTE_PATH = "https://ricardocajo.github.io/freakminimalism"

/* Fetches available sizes data and adds it to the Webpage */
function initialize_sizes() {
  let sizes_DOM = document.getElementById("sizes_list");
  fetch(ABSOLUTE_PATH + "/db/sizes/sizes.json")
    .then(response => response.json())
    .then(data => {
      let sizes = Object.keys(data).filter(size => data[size]);
      let sizesString = sizes.join(" | ");
      sizes_DOM.innerText = sizesString;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

/* Fetches available prices data and adds it to the Webpage */
function initialize_prices() {
  let prices_DOM = document.getElementById("prices_list");
  fetch(ABSOLUTE_PATH + "/db/prices/prices.json")
    .then(response => response.json())
    .then(data => {
      const maxLength = Math.max(...Object.keys(data).map(key => key.length));
      const monospaceFont = "Courier New, monospace"; // Change to your desired monospaced font
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("li");
        listItem.style.fontFamily = monospaceFont;
        listItem.style.display = "flex";
        listItem.style.justifyContent = "space-between";
        listItem.innerHTML = `<span>${key}</span><span>${data[key]}</span>`;
        prices_DOM.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


