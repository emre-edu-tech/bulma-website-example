window.$ = window.jQuery = require('jquery');

// Bulma's custom file input is not working to show the file name that is chosen by the user
// It should implemented by using javascript
const fileContainer = document.querySelector('.file-name');	// File name container
const fileInput = document.getElementById('coverimage');	// Native file input
fileInput.addEventListener('change', function(event){
	const filename = fileInput.files[0].name;
	fileContainer.innerHTML = filename;
});