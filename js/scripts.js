/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


var popupOpened = false;
var popupContainer = document.getElementById('popup-container');
var popupButton = document.querySelector('.b_popup');

function openPopup() {
  popupContainer.style.display = 'block';
  popupButton.classList.add('active');
  popupOpened = true;
}

function closePopup() {
  popupContainer.style.display = 'none';
  popupButton.classList.remove('active');
  popupOpened = false;
}

function togglePopup() {
  if (popupOpened) {
    closePopup();
  } else {
    populateCarrinhoList();
    openPopup();
  }
}

document.addEventListener('click', function (event) {
  if (popupOpened && !popupContainer.contains(event.target) && !popupButton.contains(event.target)) {
    closePopup();
  }
});

let carrinhoItems = [];
// Function to populate the UL with LI elements
async function populateCarrinhoList() {
  // Get the UL element by its ID
  const ulElement = document.getElementById('carrinhoLista');

  try {
      // Clear the UL in case there's any existing content
      ulElement.innerHTML = '';

      // Loop through the data and create LI elements
      carrinhoItems.forEach(item => {
          // Create an LI element
          const liElement = document.createElement('li');
          
          // Set the innerHTML to the item so that it renders HTML correctly
          liElement.innerHTML = item;

          // Append the LI to the UL
          ulElement.appendChild(liElement);
      });

  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function adicionarCarrinhoArte() {

  var message = "Quero encomendar o produto " + currentSelectedArte;

  var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);
  window.open(whatsappUrl, '_blank');

}

var isOurDesign;
var totalPrice = 0;
var counterCarrinho = 0;

function adicionarCarrinho() {
  let precoFinal_DOM = document.getElementById("precoFinal");
  let counterCarrinho_DOM = document.getElementById("counterCarrinho");
  let currentSeletedArtigo_DOM = document.getElementById("currentSeletedArtigo");

  // Create a container for the cart item
  const itemContainer = document.createElement('div');
  itemContainer.style.display = 'flex';
  itemContainer.style.alignItems = 'center';
  itemContainer.style.justifyContent = 'space-between';
  itemContainer.style.padding = '5px 0';
  itemContainer.id = "carrinho" + counterCarrinho;

  var clonedArtigo = currentSeletedArtigo_DOM.cloneNode(true);

  // Resize the container of the images to keep them smaller
  clonedArtigo.style.width = '45px';
  clonedArtigo.style.height = 'auto';
  clonedArtigo.style.flexShrink = '0';
  clonedArtigo.style.marginRight = '10px';

  var price;

  // Create a container for the text and price to align them
  const textContainer = document.createElement('div');
  textContainer.style.display = 'flex';
  textContainer.style.alignItems = 'center';
  textContainer.style.flex = '1';

  // Create a paragraph element for the size and details
  const sizeElement = document.createElement('span');
  sizeElement.style.fontSize = '12px';
  sizeElement.style.whiteSpace = 'nowrap';

  // Dotted line filler
  const dottedLine = document.createElement('span');
  dottedLine.style.flex = '1';
  dottedLine.style.borderBottom = '1px dotted #000';
  dottedLine.style.margin = '0 10px';

  // Price element
  const priceElement = document.createElement('span');
  priceElement.style.fontSize = '12px';
  priceElement.style.whiteSpace = 'nowrap';

  // Clone the currentSelectedArtigo (which is a <div> with two images)
  if (currentSeletedArtigo_DOM) {
    // Find the images within the cloned element and resize them
    const images = clonedArtigo.getElementsByTagName('img');
    for (let img of images) {
      img.style.width = '100%';
      img.style.height = 'auto';

      if (img.id === 'clothing-image2') {
        img.style.top = '0';
        img.style.transform = 'translate(-50%, 0)';
        img.style.display = 'block';
      }
    }

    itemContainer.appendChild(clonedArtigo);
    counterCarrinho += 1;
    counterCarrinho_DOM.innerHTML = counterCarrinho;
    counterCarrinho_DOM.style =
      "position: absolute; bottom: 0; left: 0; background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px;";

    // Check if the design image is a file or a preset design
    if (currentSelectedDesignImg instanceof File) {
      isOurDesign = false;
    } else {
      isOurDesign = true;
    }

    price = calculatePrice(currentSelectedType, currentSelectedSubType, isOurDesign);

    sizeElement.textContent = `${currentSelectedType} ${currentSelectedSubType} (${currentSelectedSize}) `;
  }

  totalPrice += price;
  precoFinal_DOM.innerHTML = "Preco Final: " + totalPrice + "€";
  priceElement.textContent = `${price}€`;

  // Add "Remove" button to remove item from cart
  const removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.classList.add('removeButton');
  removeButton.style.color = 'red';
  removeButton.style.fontWeight = 'bold';
  removeButton.style.border = 'none';
  removeButton.style.background = 'transparent';
  removeButton.style.cursor = 'pointer';
  removeButton.style.fontSize = '12px';
  removeButton.style.marginLeft = '10px';

  textContainer.appendChild(sizeElement);
  textContainer.appendChild(dottedLine);
  textContainer.appendChild(priceElement);
  textContainer.appendChild(removeButton);

  itemContainer.appendChild(textContainer);

  // Convert the container's HTML to a string and add it to the cart items array
  carrinhoItems.push(itemContainer.outerHTML);
}

let colecaoitem;
function adicionarCarrinhoColecao(item) {
  let precoFinal_DOM = document.getElementById("precoFinal");
  let counterCarrinho_DOM = document.getElementById("counterCarrinho");
  colecaoitem = item;
  itemcut = item.split('.').slice(0, -1).join('.');

  // Create a container for the cart item
  const itemContainer = document.createElement('div');
  itemContainer.style.display = 'flex';
  itemContainer.style.alignItems = 'center';
  itemContainer.style.justifyContent = 'space-between';
  itemContainer.style.padding = '5px 0';
  itemContainer.id = "carrinho" + counterCarrinho;

  var clonedArtigo;

  var url = ABSOLUTE_PATH + "/db/colecoes/" + currentSelectedColecao + "/img/" + itemcut + ".png";

  fetch(url)
    .then(response => response.blob())  // Fetch the image as a Blob
    .then(blob => {
      // Create a temporary URL for the Blob
      const objectURL = URL.createObjectURL(blob);

      // Create an <img> element and set its src to the object URL
      clonedArtigo = document.createElement('img');
      clonedArtigo.src = objectURL;  // Set the image source to the object URL
      clonedArtigo.alt = 'Fetched image';  // Set an alt text

      // Resize the image and adjust positioning
      clonedArtigo.style.position = 'relative';
      clonedArtigo.style.top = '0px';
      clonedArtigo.style.left = '50%';
      clonedArtigo.style.transform = 'translateX(-50%)';
      clonedArtigo.style.width = '45px';  // Fixed width
      clonedArtigo.style.height = 'auto';
      clonedArtigo.style.flexShrink = '0';
      clonedArtigo.style.marginRight = '10px';

      // Create a container for the image to center it (adjust as needed)
      const imageContainer = document.createElement('div');
      imageContainer.style.position = 'relative';
      imageContainer.style.width = '45px';
      imageContainer.style.height = 'auto';
      imageContainer.style.display = 'flex';
      imageContainer.style.justifyContent = 'center';
      imageContainer.style.flexShrink = '0';
      imageContainer.style.marginRight = '10px';

      // Append the image to the container
      imageContainer.appendChild(clonedArtigo);
      
      // Append the image container to the item container
      itemContainer.appendChild(imageContainer);

      // Continue with the rest of the function after the image has been appended

      var price;

      // Create a container for the text and price to align them
      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.alignItems = 'center';
      textContainer.style.flex = '1';

      // Create a paragraph element for the size and details
      const sizeElement = document.createElement('span');
      sizeElement.style.fontSize = '12px';
      sizeElement.style.whiteSpace = 'nowrap';

      // Dotted line filler
      const dottedLine = document.createElement('span');
      dottedLine.style.flex = '1';
      dottedLine.style.borderBottom = '1px dotted #000';
      dottedLine.style.margin = '0 10px';

      // Price element
      const priceElement = document.createElement('span');
      priceElement.style.fontSize = '12px';
      priceElement.style.whiteSpace = 'nowrap';

      counterCarrinho += 1;
      counterCarrinho_DOM.innerHTML = counterCarrinho;
      counterCarrinho_DOM.style =
        "position: absolute; bottom: 0; left: 0; background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px;";

      price = calculatePriceColecao(currentSelectedColecao, itemcut);

      sizeElement.textContent = `${currentSelectedColecao}) `;

      totalPrice += price;
      precoFinal_DOM.innerHTML = "Preco Final: " + totalPrice + "€";
      priceElement.textContent = `${price}€`;

      // Add "Remove" button to remove item from cart
      const removeButton = document.createElement('button');
      removeButton.textContent = 'X';
      removeButton.classList.add('removeButton');
      removeButton.style.color = 'red';
      removeButton.style.fontWeight = 'bold';
      removeButton.style.border = 'none';
      removeButton.style.background = 'transparent';
      removeButton.style.cursor = 'pointer';
      removeButton.style.fontSize = '12px';
      removeButton.style.marginLeft = '10px';

      textContainer.appendChild(sizeElement);
      textContainer.appendChild(dottedLine);
      textContainer.appendChild(priceElement);
      textContainer.appendChild(removeButton);

      itemContainer.appendChild(textContainer);

      // Convert the container's HTML to a string and add it to the cart items array
      carrinhoItems.push(itemContainer.outerHTML);
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Handle any errors here
    });
}


function handleRemoveCarrinho(target) {
  // Navigate up to find the container element with an ID starting with "carrinho"
  const itemContainer = target.closest('[id^="carrinho"]'); // Matches elements with ID starting with "carrinho"
  
  if (itemContainer) {
      const itemId = itemContainer.id; // Extract the unique ID of the item (e.g., "carrinho0")

      // Remove the item from the DOM
      itemContainer.remove();

      // Find and remove the corresponding item from the carrinhoItems array
      const itemIndex = carrinhoItems.findIndex(itemHTML => itemHTML.includes(`id="${itemId}"`));
      if (itemIndex !== -1) {
          carrinhoItems.splice(itemIndex, 1); // Remove the item from the array
      }

      // Update counter and total price
      const counterCarrinho_DOM = document.getElementById("counterCarrinho");
      const precoFinal_DOM = document.getElementById("precoFinal");

      // Decrement the cart counter
      counterCarrinho -= 1;
      if (counterCarrinho <= 0) {
          counterCarrinho = 0;
          counterCarrinho_DOM.style.display = "none"; // Hide the counter if no items are left
      } else {
          counterCarrinho_DOM.innerText = counterCarrinho;
      }

      // Update total price
      const priceText = itemContainer.querySelector("span:nth-child(3)").textContent; // Get the price text (e.g., "17€")
      const itemPrice = parseFloat(priceText.replace("€", "")); // Convert to a number
      totalPrice -= itemPrice;
      if (totalPrice < 0) totalPrice = 0;
      precoFinal_DOM.innerHTML = `Preco Final: ${totalPrice.toFixed(2)}€`;
  }
}

function calculatePrice(_currentSelectedType, _currentSelectedSubType, _isOurDesign) {

  const priceMap = {
    'KING': {
      'T-SHIRT': { price: 17 },
      'ZIPP': { price: 42 },
      'POLO': { price: 18 },
      'HOOD': { price: 37 },
      'SWEAT': { price: 34 },
      'CAVAS': { price: 17 },
      'BASE-BALL': { price: 17 },
    },
    'QUEEN': {
      'T-SHIRT': { price: 17 },
      'ZIPP': { price: 42 },
      'POLO': { price: 18 },
      'HOOD': { price: 37 },
      'SWEAT': { price: 34 },
    },
    'KID': {
      'T-SHIRT': { price: 14 },
      'ZIPP': { price: 37 },
      'HOOD': { price: 28 },
      'PANAMA': { price: 16 },
      'FRASER': { price: 16 },
      'SNAPBACK': { price: 16 },
    },
  };

  // If it's not our design, return the special message
  if (!_isOurDesign) {
    return 'Em observação';
  }

  // Find the price from the map based on type and subtype
  const typePrices = priceMap[_currentSelectedType]?.[_currentSelectedSubType];

  // Return the price if found, otherwise return 'Erro'
  return typePrices ? typePrices['price'] : 'Erro'; 
}

function calculatePriceColecao(colecao, item) {

  const priceMap = {
    'DAPO': {
      'dappo1': { price: 35 },
      'dappo2': { price: 35 },
      'dappo3': { price: 35 },
      'dappo4': { price: 35 },
    },
    'FREAK': {
      'aldeia': { price: 40 },
      'lookatme': { price: 34 },
    },
    'L3G3NCHILL': {
      'legend2': { price: 37 },
    },
    'POLETEMPLE': {
      'poletemplestudio1': { price: 15 },
      'poletemplestudio2': { price: 17 },
    },
  };

  // Find the price from the map based on type and subtype
  const typePrices = priceMap[colecao]?.[item];

  // Return the price if found, otherwise return 'Erro'
  return typePrices ? typePrices['price'] : 'Erro'; 
}

async function pdfToImage(pdfBlob) {
  const pdf = await pdfjsLib.getDocument({ data: await pdfBlob.arrayBuffer() }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });

  // Create a canvas element to render the PDF page
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport: viewport }).promise;
  return canvas.toDataURL('image/png');
}

document.addEventListener("DOMContentLoaded", function() {
  // Your other JavaScript code here
  
  // Find the button and add the onclick event listener
  var button = document.getElementById('encomendarButaoB');
  button.onclick = adicionarCarrinho;
});

document.addEventListener("DOMContentLoaded", function() {
  document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'encomendarButaoC') {
      adicionarCarrinhoColecao();
    }
  });
});

var fatura; // This will store the generated PDF

  async function PDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title and styling
    const title = "Freak Minimalism - Fatura";
    const columnHeaders = ["Artigo", "Tamanho", "Preço"];
    const startY = 30; // Starting Y position for the table
    let currentY = startY;
    let totalPrice = 0; // Initialize total price

    // Get the cart items from the list
    const carrinhoLista = document.getElementById("carrinhoLista");
    const carrinhoItems = carrinhoLista.querySelectorAll("li");

    // Create dynamic form fields
    let dynamicFieldsHTML = '';

    // Add Title
    doc.setFontSize(20);
    doc.text(title, 10, 20);

    // Add column headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    let xPositions = [10, 90, 140]; // Adjusted X positions for the remaining columns
    columnHeaders.forEach((header, index) => {
      doc.text(header, xPositions[index], currentY);
    });
    currentY += 10; // Move down after headers
    doc.setFont("helvetica", "normal");

    // Iterate through `carrinhoItems` and add them to the table
    carrinhoItems.forEach((item, index) => {
      const itemDiv = item.querySelector("div"); // Main div of the cart item
      const sizeText = itemDiv.querySelector("span")?.textContent || "N/A"; // Extract size and type
    
      // Select the last span that contains the price value
      const priceSpan = itemDiv.querySelectorAll("span")[2]; // The price is in the 3rd span (index 2)
      const priceText = priceSpan?.textContent || "0€";


      // Parse the price to a number (removing the "€" symbol and converting to float)
      const price = parseFloat(priceText.replace('€', '').trim()) || 0;
      totalPrice += price; // Add the price to the total

      // Add dynamic fields for each item in the form
      dynamicFieldsHTML += `
        <div>
          <label for="item${index + 1}Size">Artigo ${index + 1} - Tamanho:</label>
          <input type="text" id="item${index + 1}Size" name="item${index + 1}Size" value="${sizeText}" readonly>
        </div>
        <div>
          <label for="item${index + 1}Price">Artigo ${index + 1} - Preço:</label>
          <input type="text" id="item${index + 1}Price" name="item${index + 1}Price" value="${priceText}" readonly>
        </div>
        <div>
          <label for="item${index + 1}Design">Design ${index + 1} - Design:</label>
          <input type="text" id="item${index + 1}Design" name="item${index + 1}Design" value='${designFilename}' readonly>
        </div>
        <br>
      `;

      // Add each cell in the row for the PDF
      const rowData = [
        sizeText.split("(")[0].trim(), // Type (e.g., "KING T-SHIRT")
        sizeText.split("(")[1]?.replace(")", "").trim() || "N/A", // Size (e.g., "L")
        `${price.toFixed(2)}€`, // Show price with currency symbol (fixed to 2 decimal points)
      ];

      // Add each cell in the row
      rowData.forEach((data, colIndex) => {
        doc.text(data, xPositions[colIndex], currentY);
      });

      currentY += 10; // Move down for the next row

      // Check if we need a new page
      if (currentY > 270) {
        doc.addPage();
        currentY = startY;
      }
    });

    // Add total price at the bottom
    currentY += 10;
    if (currentY > 270) {
      doc.addPage();
      currentY = startY;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${totalPrice.toFixed(2)}€`, 10, currentY); // Show total with 2 decimal points

    // Store the generated PDF in the fatura variable
    fatura = doc;

    // Insert the dynamically created fields into the form
    document.getElementById('dynamicFields').innerHTML = dynamicFieldsHTML;
  }

  // Trigger PDF download when needed
async function generatePDF() {
  if (fatura) {
    fatura.save("FreakMinimalism_Fatura.pdf");
  } else {
   console.error("No PDF generated yet.");
  }
}

function orcamentoCarrinho() {
  var unitsInput = document.getElementById('units-input');
  var unitsValue = unitsInput.value;
  var size1Input = document.getElementById('size-input1');
  var size2Input = document.getElementById('size-input2');
  var size1Value = size1Input.value;
  var size2Value = size2Input.value;
  let orcamento_DOM = document.getElementById("orcamentoButao");
  orcamento_DOM.style.display = "inline-block";
  var buttonElement = orcamento_DOM.querySelector('button');

  var message;

  if(buttonElement.textContent === "Pedir Orçamento") {
    message = "Quero pedir orçamento de ";
  } else {
    message = "Quero encomendar ";
  }

  message += unitsValue + " patches, com o tamanho " + size1Value + "x" + size2Value + "cm, com o design ";

  // Check if currentSelectedDesignImg is a file
  if (currentSelectedPatchImg instanceof File) {
    // Upload image to Imgur
    uploadToImgur(currentSelectedPatchImg, function(imgurLink) {
      message += imgurLink + ".";
      
      // Construct the WhatsApp API URL with the dynamic message
      var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);

      // Open WhatsApp in a new tab with the dynamic message pre-filled
      window.open(whatsappUrl, '_blank');
    });
  } else {
    message += currentSelectedPatchImg + ".";

    var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
  }
}

function comprar() {
  var message = "Quero encomendar o produto " + current_image;

    message += currentSelectedDesignImg + ".";

    var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
}

function uploadToImgur(file, callback) {
  var formData = new FormData();
  formData.append("image", file);

  fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
          Authorization: "Client-ID a9b0b8d260589be" // Replace YOUR_CLIENT_ID with your actual Imgur client ID
      },
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          callback(data.data.link);
      } else {
          console.error("Failed to upload image to Imgur");
      }
  })
  .catch(error => console.error("Error uploading image to Imgur:", error));
}

var designSection = document.getElementById('selectDesign');
function selecionarDesign() {
  designSection.style.display = 'block';
}

function checkInput(input) {
  if (input.value.length > 3) {
      input.value = input.value.slice(0, 3); // Truncate input to 3 digits
  }
}

const url = 'https://script.google.com/macros/s/AKfycbzB0D42fSCiYHjsjEI-tpzZ26C6t30KaJj4X4Gwp4GeXvS2KJME9OdW4Uhf-a4CdbKW/exec';  // Replace with your actual Apps Script URL
const orderForm = document.getElementById("orderForm");
const confirmationMessage = document.getElementById("confirmationMessage");

// Add event listener to the form
orderForm.addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Generate the PDF before submitting the form (if necessary)
  PDF().then(() => {
    // Gather the form data
    const formData = new FormData(orderForm);
    const data = {};

    formData.forEach((value, key) => {
      // If the key already exists, convert it to an array (for multiple checkboxes with the same name)
      if (data[key]) {
        data[key] = [].concat(data[key], value);
      } else {
        data[key] = value;
      }
    });

    // Send the form data to the Google Apps Script as a JSON payload
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "text/plain;charset=utf-8",  // Ensure the correct content type
        'Origin': 'https://freak-minimalism.com'  // Your website's origin for CORS
      },
      body: JSON.stringify(data)  // Send data as JSON
    })
    .then(response => response.json())  // Parse the JSON response
    .then(responseData => {
      if (responseData.success) {
        // Hide the form and show the confirmation message if the email was sent
        orderForm.style.display = "none";
        confirmationMessage.style.display = "block";
        resetPageState();
      } else {
        alert("There was an issue with the submission. Please try again.");
      }
    })
    .catch(err => {
      console.error('Error:', err);  // Handle any errors
      alert("An error occurred. Please try again.");
    });
  });
});


// Validation function
function validateForm() {
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;

  // Check if at least one of WhatsApp or Email is filled in
  if (!contact && !email) {
    alert("Por favor forneça uma forma de contato (WhatsApp ou Email)");
    return false; // Validation failed, return false
  }

  return true; // Validation passed, return true
}
