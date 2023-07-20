This is the website for the brand freakMinimalism

The website link: https://freak-minimalism.com


Mudar:

  - fazer seccao das roupas
  - ver redirecionar http para https
  - Codigo para por ultima publicacao no instagram é preciso o acess token para testar

```
<!-- Add this at the end of your HTML body to ensure the DOM is loaded before running the script -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function() {
    // Sample data for demonstration
    const clothingData = [
      { type: "shirt", color: "red" },
      { type: "pants", color: "blue" },
      // Add more clothing data here
    ];

    // Function to filter the clothing items based on selected type and color
    function filterClothing() {
      const selectedType = $("#clothing-type").val();
      const selectedColor = $("#clothing-color").val();

      // Filtering logic
      const filteredClothing = clothingData.filter(item => {
        if (selectedType === "all" && selectedColor === "all") {
          return true;
        }
        
```