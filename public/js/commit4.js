var colours = [
  '#ff0',
  '#36d6d6',
  '#00f',
  '#f00',
  '#8927d8',
  '#297f0b',
  '#cf9465',
  '#5f55de',
  '#66b5d3',
  '#66374a',
  '#ff7f00',
  '#f238a5',
  '#09b259',
  '#ff0',
  '#36d6d6',
  '#00f',
  '#f00',
  '#8927d8',
  '#297f0b',
  '#cf9465',
  '#5f55de',
  '#66b5d3',
  '#66374a',
  '#ff7f00',
  '#f238a5',
  '#09b259',
  '#e3d309'
];
var fileColours = {};

var fileElements = document.getElementsByClassName('file');
for (var i = 0; i < fileElements.length; i++) {
  var filename = fileElements[i].dataset.filename;
  if(!fileColours.hasOwnProperty(filename)){
    console.log(fileColours);
    fileColours[filename] = colours[0];
    colours.shift();
  }
  fileElements[i].style.backgroundColor=fileColours[filename];
  fileElements[i].addEventListener('click', highlightFiles);
}

function highlightFiles(event) {
  var targetElement = event.target || event.srcElement;
  var filename = targetElement.dataset.filename;
  for (var i = 0; i < fileElements.length; i++) {
    fileElements[i].classList.remove('highlight');
    fileElements[i].classList.remove('active');
    if (fileElements[i].dataset.filename === filename) {
      fileElements[i].classList.add('highlight');
    }
  }
  targetElement.classList.add('active');
}
