let ABSOLUTE_PATH = "https://ricardocajo.github.io/freakminimalism"

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
  