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
    openPopup();
  }
}

document.addEventListener('click', function (event) {
  if (popupOpened && !popupContainer.contains(event.target) && !popupButton.contains(event.target)) {
    closePopup();
  }
});

function adicionarCarrinho() {
  var productName = "Product Name"; // Example: Get the product name from your HTML or JavaScript
  var productPrice = "$10.00"; // Example: Get the product price from your HTML or JavaScript

  var encodedProductName = encodeURIComponent(productName);
  var encodedProductPrice = encodeURIComponent(productPrice);

  var message = "Quero encomendar o produto " + current_image + " com o design ";

  // Check if currentSelectedDesignImg is a file
  if (currentSelectedDesignImg instanceof File) {
    // Upload image to Imgur
    uploadToImgur(currentSelectedDesignImg, function(imgurLink) {
      message += imgurLink + ".";
      console.log(imgurLink);
      
      // Construct the WhatsApp API URL with the dynamic message
      var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);

      // Open WhatsApp in a new tab with the dynamic message pre-filled
      window.open(whatsappUrl, '_blank');
    });
  } else {
    message += currentSelectedDesignImg + ".";

    var whatsappUrl = "https://api.whatsapp.com/send?phone=351927771505&text=" + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
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
      console.log(imgurLink);
      
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

// Function to upload image to Imgur
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
