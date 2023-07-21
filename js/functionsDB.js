let ABSOLUTE_PATH = "https://freak-minimalism.com"


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


/* Fetches available works data and adds it to the Webpage */
function initialize_works() {
  let works_DOM = document.getElementById("works_list");
  fetch(ABSOLUTE_PATH + "/db/works/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          let listItem = document.createElement("li");
          listItem.classList.add("column-item");
          listItem.innerHTML = `<img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/works/img/${key} alt="...">`;
          works_DOM.appendChild(listItem);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


/* Fetches available prices data to add it to the clothing section */
function initialize_clothingItems() {
  let items_DOM = document.getElementById("clothing-type");
  fetch(ABSOLUTE_PATH + "/db/prices/prices.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("option");
        listItem.value = key;
        listItem.innerHTML = key;
        items_DOM.appendChild(listItem);
      });
      //initialize colors with 1st cloth being shown
      handleClothingTypeSelected(Object.keys(data)[0]);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Function to handle the selection (you can replace this with your desired logic)
function handleClothingTypeSelected(selectedValue) {
  let color_DOM = document.getElementById("clothing-color");
  let subtype_DOM = document.getElementById("clothing-subtype");
  fetch(ABSOLUTE_PATH + "/db/roupa/" + selectedValue + "/roupa.json")
    .then(response => response.json())
    .then(data => {
      const firstType = data.types[0];
      // Show the colors of the first clothing type
      color_DOM.innerHTML = '';
      firstType.colors.forEach(color => {
        let listItem = document.createElement("option");
        listItem.value = color;
        listItem.innerHTML = color;
        color_DOM.appendChild(listItem);
      });

      subtype_DOM.innerHTML = '';
      const types = data.types.map(item => item.type);
      types.forEach(type => {
        let listItem = document.createElement("option");
        listItem.value = type;
        listItem.innerHTML = type;
        subtype_DOM.appendChild(listItem);
      });
      
      //initialize colors with 1st cloth being shown
      //handleClothingSubTypeSelected(firstType, data);
      //handleClothingImageSelected(firstValue);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
