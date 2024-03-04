let ABSOLUTE_PATH = "https://freak-minimalism.com"


/* Fetches available sizes data and adds it to the Webpage */
function set_sizes(sizes) {
  let sizes_DOM = document.getElementById("tamanhos");

  // Clear previous content of the list
  sizes_DOM.innerHTML = '';

  // Iterate over the data array
  sizes.forEach(function(size) {
    // Create a list item for each element in the data array
    let li = document.createElement('li');
    li.textContent = size;
    
    // Append the list item to the list
    sizes_DOM.appendChild(li);
  });
}


var theSelectedSize = "";
var currentSelectedSize = "";
function handleSizeSelected(event_target) {
  let sizes_DOM = document.getElementById("tamanhos").querySelectorAll("li");
  let designs_DOM = document.getElementById("selectDesign");

  designs_DOM.style.display = "inline-block";

  sizes_DOM.forEach((item) => {
    item.classList.remove("active");
  });
  event_target.classList.add("active");

  theSelectedSize = event_target.textContent;
  currentSelectedSize = theSelectedSize;
  startDesignRotation(); // TODO what happens if size button is clicked again
}


var theSelectedDesign;
var currentSelectedDesign = "";
var currentSelectedDesignImg;
function handleDesignSelected(event_target) {
  theSelectedDesign = event_target;

  // Remove border from previously selected item
  if (currentSelectedDesign) {
    currentSelectedDesign.style.border = "none";
  } 
  currentSelectedDesign = theSelectedDesign;
  currentSelectedDesignImg = theSelectedDesign.src;
  theSelectedDesign.style.border = "6px solid #006666";
  stopDesignRotation();
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
var works_show_index = [0, 1, 2];
var works_list_size = 2;
var works_index = 0;
function initialize_works() {
  let works_DOM = document.getElementById("works_list");
  fetch(ABSOLUTE_PATH + "/db/works/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          let listItem = document.createElement("li");

          if(works_index > 2) {
            listItem.classList.add("hidden");
          }
          listItem.classList.add("column-item");
          if (key.startsWith("00")) {
            listItem.innerHTML = `<img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/works/img/${key} alt="...">`;
          } else {
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/works/img/${key}" target="_blank"><img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/works/img/${key} alt="..."><p style="font-size: 11px;">Adicionar ao carrinho</p></a>`;
          }
          works_DOM.appendChild(listItem);
          works_index = works_index + 1;


        }
      });
    })
    .catch(error => {
      works_index = 0;
      console.error('Error:', error);
    });
}


/* Fetches available works data and adds it to the Webpage 
function initialize_arte() {
  let works_DOM = document.getElementById("arte_list");
  fetch(ABSOLUTE_PATH + "/db/arte/arte.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          let listItem = document.createElement("li");
          listItem.classList.add("column-item");
          listItem.innerHTML = `<img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/arte/img/${key} alt="..." loading="lazy">`;
          works_DOM.appendChild(listItem);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}*/


/* Fetches available designs data and adds it to the Webpage */
var designs_show_index = [1, 2, 3, 4, 5];
var designs_list_size = 96;
var desgins_index = 0;
var selected_design = null;
function initialize_designs() {
  let works_DOM = document.getElementById("designs_list");
  fetch(ABSOLUTE_PATH + "/db/designs/designs.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          let listItem = document.createElement("li");
          if(desgins_index > 5) {
            listItem.classList.add("hidden");
          }
          listItem.classList.add("column-item");
          var path = ABSOLUTE_PATH+"/db/designs/img/"+key;
          if(key == '0.jpg') {
            let content = `<a><img id="firstDesign" style="cursor: pointer;" class="workscenter-fit" src=${path} alt="...">`
            content += `<label for="upload-btn" id="upload-label">Carregar Foto</label>`;
            content += `<input type="file" id="upload-btn" accept="image/*" style="cursor: pointer;">`;
            content += `</a>`;

            listItem.innerHTML = content;
            listItem.style = "position: relative;";
          } else {  
            listItem.innerHTML = `<a><img style="cursor: pointer;" class="workscenter-fit" src=${path} alt="..."></a>`;
          }
          works_DOM.appendChild(listItem);

          desgins_index = desgins_index + 1;
        }
      });
      const uploadBtn = document.getElementById('upload-btn');
      // Add an event listener to handle file selection
      uploadBtn.addEventListener('change', function() {
        const file = this.files[0]; // Get the selected file
        let firstDesign_DOM = document.getElementById("firstDesign");
        if (currentSelectedDesign) {
          currentSelectedDesign.style.border = "none";
        } 
        const imageURL = URL.createObjectURL(file);
        currentSelectedDesignImg = imageURL;
        firstDesign_DOM.src = imageURL;
        firstDesign_DOM.style.border = "6px solid #006666";
        currentSelectedDesign = firstDesign_DOM;
      });
    })
    .catch(error => {
      desgins_index = 0;
      console.error('Error:', error);
    });
}


/* Fetches available prices data to add it to the clothing section */
function initialize_clothingItems() {
  let items_DOM = document.getElementById("clothing-type");
  let clothingItems = ["KING", "QUEEN", "KID", "CHAPEUS", "ACESSÓRIOS"];

  clothingItems.forEach(item => {
    let listItem = document.createElement("li");
    listItem.value = item;
    listItem.className = "col-md-4";
    listItem.innerHTML = item;
    items_DOM.appendChild(listItem);
  });
}



// Function to handle the selection (you can replace this with your desired logic)
var theSelectedType = "";
var currentSelectedType = "";
function handleClothingTypeSelected(event_target) {
  let color_DOM = document.getElementById("color-list");
  let subtype_DOM = document.getElementById("clothing-subtype");
  theSelectedType = event_target.textContent.replace(/[\s|]/g, "");
  let desc_DOM = document.getElementById("clothing-desc");
  let artigo_section_DOM = document.getElementById("artigo_section");
  let cor_section_DOM = document.getElementById("cor_section");
  let designs_DOM = document.getElementById("selectDesign");

  if (artigo_section_DOM.style.display === "none" || (artigo_section_DOM.style.display === "flex" && theSelectedType !== currentSelectedType)) {
    fetch(ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/roupa.json")
      .then(response => response.json())
      .then(data => {
        
        const firstType = data.types[0];

        subtype_DOM.innerHTML = '';
        const types = data.types.map(item => item.type);
        types.forEach(type => {
          let listItem = document.createElement("li");
          listItem.value = type;
          listItem.className = "col-md-4";
          listItem.innerHTML = type;
          subtype_DOM.appendChild(listItem);
        });

        cor_section_DOM.style.display = "none";
        //desc_DOM.innerHTML = firstType.desc;
        
        //theSelectedSubType = firstType.type;
        //const allListItems = document.querySelectorAll("#clothing-subtype li");
        //const firstListItem = allListItems[0];
        //theSelectedColor = firstType.colors[0];

        //handleClothingSubTypeSelected(firstListItem);
        //handleClothingColorSelected(firstType.colors[0]);
      })
    .catch(error => {
      console.error('Error:', error);
    });

    //currentSelectedType = theSelectedType;
    artigo_section_DOM.style.display = "flex";
    const allListItems = document.querySelectorAll("#clothing-type li");
    allListItems.forEach((item) => {
      item.classList.remove("active");
    });
    event_target.classList.add("active");
    designs_DOM.style.display = "none";
  } else {
    currentSelectedType = "";
    artigo_section_DOM.style.display = "none";
    event_target.classList.remove("active");
  } 
}

var theSelectedSubType = "";
var currentSelectedSubType = "";
function handleClothingSubTypeSelected(event_target) {
  let image_DOM = document.getElementById("clothing-image");
  let color_DOM = document.getElementById("color-list");
  const selectedValue = event_target.textContent;
  theSelectedSubType = selectedValue.replace(/[\s|]/g, "");
  let desc_DOM = document.getElementById("clothing-desc");
  let cor_section_DOM = document.getElementById("cor_section");
  let designs_DOM = document.getElementById("selectDesign");

  const allListItems = document.querySelectorAll("#clothing-subtype li");
  allListItems.forEach((item) => {
    item.classList.remove("active");
  });
  event_target.classList.add("active");

if (cor_section_DOM.style.display === "none" || (cor_section_DOM.style.display === "flex" && theSelectedSubType !== currentSelectedSubType)) {
  fetch(ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/" + theSelectedSubType + "/roupa.json")
    .then(response => response.json())
    .then(data => {
      // Show the colors of the matching clothing type
      while(color_DOM.firstChild){
        color_DOM.removeChild(color_DOM.firstChild);
      }
      data.types[0].colors.forEach(color => {

        // Create the div element with class "color-item"
        const colorItemDiv = document.createElement("div");
        colorItemDiv.className = "color-item";

        // Create the button element with class "color-button"
        const colorButton = document.createElement("button");
        colorButton.className = "color-button";

        // Create the img element and set its src and alt attributes
        const img = document.createElement("img");
        img.src = `${ABSOLUTE_PATH}/db/colors/${color}.png`;
        img.alt = color;

        // Append the img element to the button element
        colorButton.appendChild(img);
        // Append the button element to the div element
        colorItemDiv.appendChild(colorButton);
        
        color_DOM.appendChild(colorItemDiv);
      });

      // Add the event listener to the parent element (event delegation)
      document.getElementById("color-list").addEventListener("click", function(event) {
        const button = event.target.closest(".color-button");
        if (button) {
          const image = button.querySelector("img");
          const altValue = image.getAttribute("alt");
          handleClothingColorSelected(altValue);
        }
      });

      // Update theSelectedColor with the first color of the matching type
      theSelectedColor = data.types[0].colors[0];
      handleClothingColorSelected(theSelectedColor);

      desc_DOM.innerHTML = data.types[0].desc;

      // Now, initiate the second fetch with the updated theSelectedColor value
      fetch(ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/" + theSelectedSubType + "/" + theSelectedColor + ".png")
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          image_DOM.src = imageUrl;
        })
        .catch(error => {
          console.error('Error:', error);
        });

        set_sizes(data.types[0].sizes);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    currentSelectedSubType = theSelectedSubType;
    cor_section_DOM.style.display = "flex";
    const allListItems = document.querySelectorAll("#clothing-subtype li");
    allListItems.forEach((item) => {
      item.classList.remove("active");
    });
    event_target.classList.add("active");
    designs_DOM.style.display = "none";
  } else {
    currentSelectedSubType = "";
    cor_section_DOM.style.display = "none";
    event_target.classList.remove("active");
  } 
}



var theSelectedColor = "";
var current_image = null;
function handleClothingColorSelected(selectedValue) {
  let image_DOM = document.getElementById("clothing-image");
  theSelectedColor = selectedValue;
  const path = ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/" + theSelectedSubType + "/" + theSelectedColor + ".png"
  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(imageBlob => {
      const imageUrl = URL.createObjectURL(imageBlob);
      image_DOM.src = imageUrl;
      current_image = path;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
