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
        Object.keys(data).forEach(key => {
            prices_DOM.appendChild(document.createElement("li")
                .appendChild(document.createTextNode(key + "......." + data[key])));
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
