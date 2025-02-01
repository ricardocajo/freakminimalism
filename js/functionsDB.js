let ABSOLUTE_PATH = "https://freak-minimalism.com"

function set_marcas(marcas) {
  let marcas_DOM = document.getElementById("roupa-banners");

  // Clear previous content of the list
  marcas_DOM.innerHTML = '';

  marcas.forEach(function(marca) {
    // Create the <a> element
    let a = document.createElement('a');
    a.setAttribute('class', 'mx-4');
    a.setAttribute('target', '_blank');
    
    // Create the <img> element
    let img = document.createElement('img');
    img.setAttribute('class', 'custom-image-size2');
    img.setAttribute('src', `https://freak-minimalism.com/db/marcas/${marca}.jpg`);
    img.setAttribute('alt', '...');
    img.setAttribute('loading', 'lazy');
    
    // Append the <img> element to the <a> element
    a.appendChild(img);
    
    // Append the <a> element to the DOM
    marcas_DOM.appendChild(a);
  });
}


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



var theSelectedOtherSize = "";
var currentSelectedOtherSize = "";
function handleOtherSizeSelected(event_target) {
  let sizes_DOM = document.getElementById("tamanhos").querySelectorAll("li");
  let selectDesignToalha_DOM = document.getElementById("selectDesignToalha");

  //let encomendar_DOM = document.getElementById("encomendarButao");
  //encomendar_DOM.style.display = "inline-block";

  sizes_DOM.forEach((item) => {
    item.classList.remove("active");
  });
  event_target.classList.add("active");

  theSelectedOtherSize = event_target.textContent;
  currentSelectedOtherSize = theSelectedOtherSize;

  if(theSelectedSubType === "TOALHA") {
    selectDesignToalha_DOM.style.display = "flex";
  }
}


var theSelectedDesign;
var currentSelectedDesign = "";
var currentSelectedDesignImg;
var currentSelectedDesignImgFile;
var designFilename;
function handleDesignSelected(event_target) {
  let encomendar_DOM = document.getElementById("encomendarButao");
  let image_DOM = document.getElementById("clothing-image2");
  const uploadBtn = document.getElementById('upload-btn');

  encomendar_DOM.style.display = "inline-block";
  theSelectedDesign = event_target;

  // Remove border from previously selected item
  if (currentSelectedDesign) {
    currentSelectedDesign.style.border = "none";
  } 
  currentSelectedDesign = theSelectedDesign;
  currentSelectedDesignImg = theSelectedDesign.src;
  theSelectedDesign.style.border = "6px solid #006666";

  if (theSelectedDesign.nodeName === "IMG") {
    if (theSelectedDesign.id !== "firstDesign") {
      designFilename = currentSelectedDesignImg.substring(currentSelectedDesignImg.lastIndexOf('/') + 1);
      fetch(ABSOLUTE_PATH + "/db/designs/sfundo/" + currentSelectedDesignImg.substring(currentSelectedDesignImg.length - 6))
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        image_DOM.src = imageUrl;
        image_DOM.style.display = "flex";
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      image_DOM.style.display = "none";
      if (theSelectedDesign.src === "https://freak-minimalism.com/db/designs/img/0.jpg") {
        uploadBtn.click();
      } else {
        currentSelectedDesignImg = currentSelectedDesignImgFile;
      }
    }
  }
  stopDesignRotation();
}

function handleDesignChapeusSelected(event_target) {
  let encomendar_DOM = document.getElementById("encomendarButao");
  let image_DOM = document.getElementById("clothing-image2");

  encomendar_DOM.style.display = "inline-block";
  theSelectedDesign = event_target;

  // Remove border from previously selected item
  if (currentSelectedDesign) {
    currentSelectedDesign.style.border = "none";
  } 
  currentSelectedDesign = theSelectedDesign;
  currentSelectedDesignImg = theSelectedDesign.src;
  theSelectedDesign.style.border = "6px solid #006666";

  /*fetch(ABSOLUTE_PATH + "/db/designs/sfundo/" + currentSelectedDesignImg.substring(currentSelectedDesignImg.length - 6))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(imageBlob => {
      const imageUrl = URL.createObjectURL(imageBlob);
      image_DOM.src = imageUrl;
      image_DOM.style.display = "flex";
    })
    .catch(error => {
      console.error('Error:', error);
    });*/
}


var theSelectedPatch;
var currentSelectedPatch = "";
var currentSelectedPatchImg;
function handlePatchSelected(event_target) {
  let orcamento_DOM = document.getElementById("orcamentoButao");
  const sizeInput1 = document.getElementById("size-input1");
  const sizeInput2 = document.getElementById("size-input2");

  theSelectedPatch = event_target;
  // Remove border from previously selected item
  if (currentSelectedPatch) {
    currentSelectedPatch.style.border = "none";
  } 
  currentSelectedPatch = theSelectedPatch;
  currentSelectedPatchImg = theSelectedPatch.src;
  theSelectedPatch.style.border = "6px solid #006666";
  stopPatchRotation();

  orcamento_DOM.style.display = "inline-block";
  var buttonElement = orcamento_DOM.querySelector('button');

  if (event_target.tagName === 'IMG') {
    // Set the value of the input fields
    sizeInput1.value = 5;
    sizeInput2.value = 5;

    // Disable the input fields
    sizeInput1.disabled = true;
    sizeInput2.disabled = true;
    // Add a new class to sizeInput1 without removing existing classes
    sizeInput1.classList.add("custom-input");
    sizeInput2.classList.add("custom-input");

    buttonElement.textContent = "Encomendar";
  } else {
    
    buttonElement.textContent = "Pedir Orçamento";
    sizeInput1.disabled = false;
    sizeInput2.disabled = false;
    // Remove a specific class from sizeInput1
    sizeInput1.classList.remove("custom-input");
    sizeInput2.classList.remove("custom-input");

  }
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

function initialize_colecao(name) {
  name = name.replace(/[\s|]/g, "");
  let colecao_DOM = document.getElementById(name + "_list");
  fetch(ABSOLUTE_PATH + "/db/colecoes/"+ name + "/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("li");
        listItem.classList.add("column-item");
        switch(key) {
          case "img":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" alt="...">`;
            break;
          case "img2":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" alt="..."><br><br><button id="encomendarButaoC" onclick="adicionarCarrinhoColecao('${data[key]}')" class="mt-5 clickable-button">Adicionar ao Carrinho</button>`;
            break;
          case "img3":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" alt="..."><br><br><button id="encomendarButaoC" onclick="adicionarCarrinhoColecao('${data[key]}')" class="mt-5 clickable-button">Adicionar ao Carrinho</button>`;
            break;
          case "img4":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" alt="..."><br><br><button id="encomendarButaoC" onclick="adicionarCarrinhoColecao('${data[key]}')" class="mt-5 clickable-button">Adicionar ao Carrinho</button>`;
            break;
          case "img5":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" alt="..."><br><br><button id="encomendarButaoC" onclick="adicionarCarrinhoColecao('${data[key]}')" class="mt-5 clickable-button">Adicionar ao Carrinho</button>`;
            break;
          case "video":
            listItem.innerHTML = `<video class="media-fit" autoplay loop muted loading="lazy"><source src="${ABSOLUTE_PATH}/db/colecoes/${name}/img/${data[key]}" type="video/mp4">Your browser does not support the video tag.</video><br><br><button id="encomendarButaoC" onclick="adicionarCarrinhoColecao('${data[key]}')" class="mt-5 clickable-button">Adicionar ao Carrinho</button>`;            
            break;
          case "desc":
            let parts = data[key].split(';');
            parts.forEach((part) => {
              listItem.innerHTML = listItem.innerHTML + `<p>${part}</p>`;
            });
            break;
          default:
            // code block
        }
        colecao_DOM.appendChild(listItem);
      });
    })
    .catch(error => {
      //works_index = 0;
      console.error('Error:', error);
    });
}

function initialize_destaque(name) {
  name = name.replace(/[\s|]/g, "");
  let destaque_DOM = document.getElementById(name + "_list");
  fetch(ABSOLUTE_PATH + "/db/destaques/"+ name + "/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("li");
        listItem.classList.add("column-item");
        switch(key) {
          case "img":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/destaques/${name}/img/${data[key]}" alt="...">`;
            break;
          case "img3":
            listItem.innerHTML = `<img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/destaques/${name}/img/${data[key]}" alt="...">`;
            break;
          case "video":
            listItem.innerHTML = `<video class="media-fit" autoplay loop muted loading="lazy"><source src="${ABSOLUTE_PATH}/db/destaques/${name}/img/${data[key]}" type="video/mp4">Your browser does not support the video tag.</video>`;            
            break;
          case "desc":
            let parts = data[key].split(';');
            parts.forEach((part, index) => {

              // Check if it's the first or last item
              if (index === 0 || index === 1 || index === parts.length - 1) {
                listItem.innerHTML += `<p class="glow-text large-text">${part}</p>`;
              } else {
                listItem.innerHTML += ` <br>
                                        <ul id="tamanhos2" class="row" style="display: flex; flex-wrap: wrap; list-style-type: none; padding: 0; justify-content: space-between; gap: 10px;">
                                          <li class="glow-red" style="flex: 1 1 30%; display: none;">XS</li>
                                          <li class="glow-red" style="flex: 1 1 30%; display: none;">S</li>
                                          <li class="glow-white active" style="flex: 1 1 30%;">M</li> <!-- "M" is pre-selected with white glow -->
                                          <li class="glow-red" style="flex: 1 1 30%; display: none;">L</li>
                                          <li class="glow-red" style="flex: 1 1 30%; display: none;">XL</li>
                                          <li class="glow-red" style="flex: 1 1 30%; display: none;">XXL</li>
                                        </ul>
                                        <br>`;
              }
            });

            // Add the centered button below the description parts
            listItem.innerHTML += `
              <div class="button-container">
                <button id="encomendarButaoC" onclick="adicionarCarrinhoDestaque('${data[key]}')" class="mt-5 clickable-button">
                  Adicionar ao Carrinho
                </button>
              </div>
            `;
          default:
            // code block
        }
        destaque_DOM.appendChild(listItem);
      });
    })
    .catch(error => {
      //works_index = 0;
      console.error('Error:', error);
    });
}

function initialize_3d(name) {
  name = name.replace(/[\s|]/g, "");
  let d_DOM = document.getElementById(name + "_list");
  fetch(ABSOLUTE_PATH + "/db/3d/"+ name + "/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("li");
        listItem.classList.add("column-item");
        switch(key) {
          case "img":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" alt="..."></a>`;
            break;
          case "img2":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" alt="..."><br><br><button style="font-size: 19px;">Encomendar</button></a>`;
            break;
          case "img3":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" alt="..."><br><br><button style="font-size: 19px;">Encomendar</button></a>`;
            break;
          case "img4":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" alt="..."><br><br><button style="font-size: 19px;">Encomendar</button></a>`;
            break;
          case "img5":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><img class="workscenter-fit media-fit" src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" alt="..."><br><br><button style="font-size: 19px;">Encomendar</button></a>`;
            break;
          case "video":
            listItem.innerHTML = `<a class="mx-2" href="https://api.whatsapp.com/send?phone=351927771505&amp;text=Quero%20esta%20merch!%20${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" target="_blank"><video class="media-fit" autoplay loop muted loading="lazy"><source src="${ABSOLUTE_PATH}/db/3d/${name}/img/${data[key]}" type="video/mp4">Your browser does not support the video tag.</video><br><br><button style="font-size: 19px;">Encomendar</button></a>`;            
            break;
          case "desc":
            let parts = data[key].split(';');
            parts.forEach((part) => {
              listItem.innerHTML = listItem.innerHTML + `<p>${part}</p>`;
            });
            break;
          default:
            // code block
        }
        d_DOM.appendChild(listItem);
      });
    })
    .catch(error => {
      //works_index = 0;
      console.error('Error:', error);
    });
}

function initialize_arte(name) {
  name = name.replace(/[\s|]/g, "");
  let arte_DOM = document.getElementById(name + "_list");
  fetch(ABSOLUTE_PATH + "/db/arte/"+ name + "/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        let listItem = document.createElement("li");
        listItem.classList.add("column-item");
        switch(key) {
          case "img":
            listItem.innerHTML = `<img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/arte/${name}/${data[key]} alt="...">`;
            break;
            case "img2":
              listItem.innerHTML = `<img class="workscenter-fit" src=${ABSOLUTE_PATH}/db/arte/${name}/${data[key]} alt="...">`;
              break;
          case "video":
            listItem.innerHTML = `<video width="520" height="300" autoplay loop muted loading="lazy"><source src="${ABSOLUTE_PATH}/db/arte/${name}/${data[key]}" type="video/mp4">Your browser does not support the video tag.</video>`;
            break;
          case "desc":
            let parts = data[key].split(';');
            parts.forEach((part, index) => {
              if (index === 0) {
                listItem.innerHTML = listItem.innerHTML + `<p style="font-size: 1.8em; font-weight: bold;"">${part}</p>`;
              } else {
                // Regular case for other items
                listItem.innerHTML = listItem.innerHTML + `<p>${part}</p>`;
              }
            });
            const buttonHtml = `<button id="encomendarButaoB" onclick="adicionarCarrinhoArte()" class="mt-5">Encomendar</button>`;
            listItem.innerHTML += buttonHtml;
            break;
          default:
            // code block
        }
        arte_DOM.appendChild(listItem);
      });
    })
    .catch(error => {
      //works_index = 0;
      console.error('Error:', error);
    });
}


/* Fetches available designs data and adds it to the Webpage */
var designs_show_index = [1, 2, 3, 4, 5];
var designs_list_size = 56;
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
    })
    .catch(error => {
      desgins_index = 0;
      console.error('Error:', error);
    });
}


var patch_show_index = [1, 2, 3, 4, 5];
var patch_list_size = 10;
var patch_index = 0;
var selected_patch = null;
function initialize_patch() {
  let works_DOM = document.getElementById("patch_list");
  fetch(ABSOLUTE_PATH + "/db/patch/patch.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          let listItem = document.createElement("li");
          if(patch_index > 5) {
            listItem.classList.add("hidden");
          }
          listItem.classList.add("column-item");
          var path = ABSOLUTE_PATH+"/db/patch/img/"+key;
          if(key == '0.jpg') {
            let content = `<a><img id="firstPatch" style="cursor: pointer;" class="workscenter-fit" src=${path} alt="...">`
            content += `<label for="upload-btn-patch" id="upload-label-patch">Carregar Foto</label>`;
            content += `<input type="file" id="upload-btn-patch" accept="image/*" style="cursor: pointer;">`;
            content += `</a>`;

            listItem.innerHTML = content;
            listItem.style = "position: relative;";
          } else {  
            listItem.innerHTML = `<a><img style="cursor: pointer;" class="workscenter-fit" src=${path} alt="..."></a>`;
          }
          works_DOM.appendChild(listItem);

          patch_index = patch_index + 1;
        }
      });
    })
    .catch(error => {
      desgins_index = 0;
      console.error('Error:', error);
    });
}

// Function to handle the selection (you can replace this with your desired logic)
var theSelectedColecao = "";
var currentSelectedColecao = "";
function handleColecoesTypeSelected(event_target) {
  theSelectedColecao = event_target.textContent.replace(/[\s|]/g, "");
  let old_list_DOM = document.getElementById(currentSelectedColecao + "_list");
  let list_DOM = document.getElementById(theSelectedColecao + "_list");

  list_DOM.style.display = "flex";
  if(theSelectedColecao !== "" && currentSelectedColecao !== theSelectedColecao) {
    old_list_DOM.style.display = "none";
  }

  currentSelectedColecao = theSelectedColecao;
  console.log(theSelectedColecao);
  console.log(currentSelectedColecao);
}


function initialize_colecoesItems() {
  let items_DOM = document.getElementById("colecoes-type");
  let colecoesItems = ["POLETEMPLE"];

  colecoesItems.forEach(item => {
    let listItem = document.createElement("li");
    listItem.value = item;
    listItem.className = "col-md-4";
    listItem.innerHTML = item;
    items_DOM.appendChild(listItem);
    initialize_colecao(item);
  });
}

function initialize_destaquesItems() {
  let destaquesItems = ["DESTAQUE1", "DESTAQUE2", "DESTAQUE3"];

  destaquesItems.forEach(item => {
    initialize_destaque(item);
  });
}

var theSelected3d = "";
var currentSelected3d = "";
function handle3dTypeSelected(event_target) {
  theSelected3d = event_target.textContent.replace(/[\s|]/g, "");
  let old_list_DOM = document.getElementById(currentSelected3d + "_list");
  let list_DOM = document.getElementById(theSelected3d + "_list");

  list_DOM.style.display = "flex";
  if(theSelected3d !== "" && currentSelected3d !== theSelected3d) {
    old_list_DOM.style.display = "none";
  }

  currentSelected3d = theSelected3d;
}


function initialize_3dItems() {
  let items_DOM = document.getElementById("3d-type");
  let tresdItems = ["CINZEIROS"];

  tresdItems.forEach(item => {
    let listItem = document.createElement("li");
    listItem.value = item;
    listItem.className = "col-md-4";
    listItem.innerHTML = item;
    items_DOM.appendChild(listItem);
    initialize_3d(item);
  });
}

function initialize_artesItems() {
  let items_DOM = document.getElementById("artes-type");
  let artesItems = ["emc2", "GIЯLS"];

  artesItems.forEach(item => {
    let listItem = document.createElement("li");
    listItem.value = item;
    listItem.className = "col-md-4";
    listItem.innerHTML = item;
    items_DOM.appendChild(listItem);
    initialize_arte(item);
  });
}

/* Fetches available prices data to add it to the clothing section */
function initialize_clothingItems() {
  let items_DOM = document.getElementById("clothing-type");
  let clothingItems = ["KING", "QUEEN", "KID", "CHAPEUS", "ACESSORIOS"];

  clothingItems.forEach(item => {
    let listItem = document.createElement("li");
    listItem.value = item;
    listItem.className = "col-md-4";
    listItem.innerHTML = item;
    items_DOM.appendChild(listItem);
  });
}


var theSelectedArte = "";
var currentSelectedArte = "";
function handleArteTypeSelected(event_target) {
  theSelectedArte = event_target.textContent.replace(/[\s|]/g, "");
  let theSelectedArte_DOM = document.getElementById(theSelectedArte + "_list");
  let currentSelectedArte_DOM = document.getElementById(currentSelectedArte + "_list");

  if(currentSelectedArte_DOM) {
    currentSelectedArte_DOM.style.display = "none";
  }
  theSelectedArte_DOM.style.display = "flex";
  currentSelectedArte = theSelectedArte;
}


// Function to handle the selection (you can replace this with your desired logic)
var theSelectedType = "";
var currentSelectedType = "";
function handleClothingTypeSelected(event_target) {
  let subtype_DOM = document.getElementById("clothing-subtype");
  theSelectedType = event_target.textContent.replace(/[\s|]/g, "");
  let artigo_section_DOM = document.getElementById("artigo_section");
  let cor_section_DOM = document.getElementById("cor_section");
  let designs_DOM = document.getElementById("selectDesign");
  let encomendar_DOM = document.getElementById("encomendarButao");
  let selectDesignChapeu_DOM = document.getElementById("selectDesignChapeu");
  let selectDesignToalha_DOM = document.getElementById("selectDesignToalha");
  let image2_DOM = document.getElementById("clothing-image2");

  if (artigo_section_DOM.style.display === "none" || (artigo_section_DOM.style.display === "flex" && theSelectedType !== currentSelectedType)) {
    fetch(ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/roupa.json")
      .then(response => response.json())
      .then(data => {

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
      })
    .catch(error => {
      console.error('Error:', error);
    });

    currentSelectedType = theSelectedType;
    artigo_section_DOM.style.display = "flex";
    encomendar_DOM.style.display = "none";
    const allListItems = document.querySelectorAll("#clothing-type li");
    allListItems.forEach((item) => {
      item.classList.remove("active");
    });
    event_target.classList.add("active");
    designs_DOM.style.display = "none";
    image2_DOM.style.display = "none";
    if (theSelectedDesign) {
      theSelectedDesign.style.border = "none";
    }
    selectDesignChapeu_DOM.style.display = "none";
    selectDesignToalha_DOM.style.display = "none";
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
  let encomendar_DOM = document.getElementById("encomendarButao");
  let menu1_DOM = document.getElementById("menu1");
  let menu2_DOM = document.getElementById("menu2");
  let selectDesignChapeu_DOM = document.getElementById("selectDesignChapeu");
  let selectDesignToalha_DOM = document.getElementById("selectDesignToalha");
  let image2_DOM = document.getElementById("clothing-image2");
  let tamanhos_image_DOM = document.getElementById("tamanhos-image");

  encomendar_DOM.style.display = "none";
  const allListItems = document.querySelectorAll("#clothing-subtype li");
  allListItems.forEach((item) => {
    item.classList.remove("active");
  });
  event_target.classList.add("active");


if (cor_section_DOM.style.display === "none" || (cor_section_DOM.style.display === "flex" && theSelectedSubType !== currentSelectedSubType)) {
  fetch(ABSOLUTE_PATH + "/db/roupa/" + theSelectedType + "/" + theSelectedSubType + "/roupa.json")
    .then(response => response.json())
    .then(data => {
      
      if(selectedValue === "PATCH") {
        menu2_DOM.style.display = "flex";
        menu1_DOM.style.display = "none";
        startPatchRotation();

      } else {
        menu2_DOM.style.display = "none";
        menu1_DOM.style.display = "flex";

        // Show the colors of the matching clothing type
        while(color_DOM.firstChild) {
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

        if (data.types[0]["sizes-image"]) {
          tamanhos_image_DOM.src = data.types[0]["sizes-image"];
          tamanhos_image_DOM.style.display = 'flex';
        } else {
          tamanhos_image_DOM.style.display = 'none';
        }


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
          set_marcas(data.types[0].marcas);

      }  

      if((theSelectedType === "CHAPEUS" && theSelectedSubType !== "") || (theSelectedType === "KID" && (theSelectedSubType === "FRASER" || theSelectedSubType === "SNAPBACK"))) {
        selectDesignChapeu_DOM.style.display = "flex";
      } else {
        selectDesignChapeu_DOM.style.display = "none";
      }
      selectDesignToalha_DOM.style.display = "none";
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
    image2_DOM.style.display = "none";
    if (theSelectedDesign) {
      theSelectedDesign.style.border = "none";
    }
  } else {
    currentSelectedSubType = "";
    cor_section_DOM.style.display = "none";
    event_target.classList.remove("active");
    selectDesignChapeu_DOM.style.display = "none";
    selectDesignToalha_DOM.style.display = "none";
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

function resetPageState() {
  let counterCarrinho_DOM = document.getElementById("counterCarrinho");
  // Reset the cart counter and price
  totalPrice = 0;
  counterCarrinho = 0;
  counterCarrinho_DOM.style.display = 'none';
  document.getElementById("counterCarrinho").innerHTML = counterCarrinho;

  carrinhoItems = [];

  // Reset the form fields
  document.getElementById("orderForm").reset();

  // Probably need to reset more stuff?
}