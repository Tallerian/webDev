function uploadImg() {
    document.getElementById('imageInput').click(); // Trigger the click event of the file input element
}

document.getElementById('imageInput').addEventListener('change', function(event) {
    identifyPlant(); // Call the identifyPlant function after the image is uploaded
});

function identifyPlant() {
    var fileInput = document.getElementById("imageInput");
    var file = fileInput.files[0];
    
    var formData = new FormData();
    formData.append("images", file, file.name);

    var requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: formData
    };

    fetch('./php/scan.php', requestOptions)
        .then(response => response.json())
        .then(data => {
            // Extracting best match result
            var bestMatch = data.bestMatch;
            var species = data.results[0].species;
            var confidence = data.results[0].score;

            // Remove author from scientific name
            var scientificName = species.scientificNameWithoutAuthor || species.scientificName;

            // Constructing the result string
            var resultString = "<p> <strong>Common Name:</strong> " + species.commonNames[0] + "<br>" +
                            "<strong>Scientific Name:</strong> " + scientificName + "<br>" +
                            "<strong>Confidence:</strong> " + confidence + "</p>";

            // Displaying the result
            document.getElementById("resultContainer").innerHTML = resultString;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// function previewImage(event) {
//     var input = event.target;
//     var reader = new FileReader();
//     reader.onload = function() {
//         var dataURL = reader.result;
//         var imagePreview = document.getElementById('imagePreview');
//         imagePreview.innerHTML = '<img class="imgPrev" src="' + dataURL + '">';
//         // Displace the scan button downward
//         var scanButton = document.querySelector('.scanBtn');
//         var imagePreviewHeight = imagePreview.offsetHeight;
//         scanButton.style.bottom = (50 + imagePreviewHeight / 10) + 'vh'; // Adjust as needed
//     };
    
//     reader.readAsDataURL(input.files[0]);
// }
