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

  // Clone the currentSelectedArtigo (which is a <div> with two images)
  if (currentSeletedArtigo_DOM) {
    const clonedArtigo = currentSeletedArtigo_DOM.cloneNode(true);

    // Resize the container of the images to keep them smaller
    clonedArtigo.style.width = '45px';
    clonedArtigo.style.height = 'auto';
    clonedArtigo.style.flexShrink = '0';
    clonedArtigo.style.marginRight = '10px';

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
    counterCarrinho_DOM.style = "position: absolute; bottom: 0; left: 0; background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px;";
  }

  // Check if the design image is a file or a preset design
  if (currentSelectedDesignImg instanceof File) {
    isOurDesign = false;
  } else {
    isOurDesign = true;
  }

  const price = calculatePrice(currentSelectedType, currentSelectedSubType, isOurDesign);
  totalPrice += price;
  precoFinal_DOM.innerHTML = "Preco Final: " + totalPrice + "€";

  // Create a container for the text and price to align them
  const textContainer = document.createElement('div');
  textContainer.style.display = 'flex';
  textContainer.style.alignItems = 'center';
  textContainer.style.flex = '1';

  // Create a paragraph element for the size and details
  const sizeElement = document.createElement('span');
  sizeElement.textContent = `${currentSelectedType} ${currentSelectedSubType} (${currentSelectedSize}) `;
  sizeElement.style.fontSize = '12px';
  sizeElement.style.whiteSpace = 'nowrap';

  // Dotted line filler
  const dottedLine = document.createElement('span');
  dottedLine.style.flex = '1';
  dottedLine.style.borderBottom = '1px dotted #000';
  dottedLine.style.margin = '0 10px';

  // Price element
  const priceElement = document.createElement('span');
  priceElement.textContent = `${price}€`;
  priceElement.style.fontSize = '12px';
  priceElement.style.whiteSpace = 'nowrap';

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

async function generatePDF() {
  console.log("Generating PDF...");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title and styling
  const title = "Freak Minimalism - Fatura";
  const columnHeaders = ["Artigo", "Tamanho", "Preço"];
  const startY = 30; // Starting Y position for the table
  let currentY = startY;
  let totalPrice = 0; // Initialize total price

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

  // Get the cart items from the list
  const carrinhoLista = document.getElementById("carrinhoLista");
  const carrinhoItems = carrinhoLista.querySelectorAll("li");

  // Iterate through `carrinhoItems` and add them to the table
  carrinhoItems.forEach((item) => {
    const itemDiv = item.querySelector("div"); // Main div of the cart item
    const sizeText = itemDiv.querySelector("span")?.textContent || "N/A"; // Extract size and type
    
    // Select the last span for the price
    const priceText = itemDiv.querySelector("span:last-child")?.textContent || "0€"; // Extract price

    console.log("Extracted Price Text:", priceText);

    // Parse the price to a number (removing the "€" symbol and converting to float)
    const price = parseFloat(priceText.replace('€', '').trim()) || 0;
    totalPrice += price; // Add the price to the total

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

  // Trigger download
  doc.save("FreakMinimalism_Fatura.pdf");
}

document.addEventListener("DOMContentLoaded", function() {
  // Your other JavaScript code here
  
  // Find the button and add the onclick event listener
  var button = document.getElementById('encomendarButaoB');
  button.onclick = adicionarCarrinho;
});

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

const orderForm = document.getElementById("orderForm");
const confirmationMessage = document.getElementById("confirmationMessage");
// Add event listener to the form
document.getElementById("orderForm").addEventListener("submit", function(event) {
  // Prevent form submission initially
  event.preventDefault();

  // Validate form before proceeding with submission
  if (!validateForm()) {
    return; // If validation fails, stop the function here
  }

  // If validation passes, gather form data
  const formData = new FormData(event.target);

  // Send the data via Fetch API
  fetch(event.target.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Hide the form and show the confirmation message
      event.target.style.display = "none";
      document.getElementById("confirmationMessage").style.display = "block";

      resetPageState();
    } else {
      alert("There was an issue with the submission. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("There was an error submitting the form.");
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
