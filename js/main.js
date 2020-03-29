// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    start();
} else {
    alert('The File APIs are not fully supported in this browser.');
}

var newsdateInput;
var imgsDiv;
function start() {
    document.getElementById('fetchImages').addEventListener('click', fetchImages, false);
    //document.getElementById('savePDF').addEventListener('click', savePDF, false);
    document.getElementById('print').addEventListener('click', printPDF, false);
    newsdateInput = document.getElementById('newsdate');
    imgsDiv = document.getElementById('imgs');
    newsdateInput.value=getTodayDate();
}

function getTodayDate() {
    const val = new Date();
    year = val.getFullYear();
    month = formatNumber(val.getMonth() + 1);
    day = formatNumber(val.getDate());

    return `${year}-${month}-${day}`;
}

function fetchImages() {
    val = newsdate.valueAsDate;
    year = val.getFullYear();
    month = formatNumber(val.getMonth() + 1);
    day = formatNumber(val.getDate());

    imgsDiv.innerHTML = '';
    for (i = 1; i <= 12; i++) {
        str = `http://www.enewspapr.com/News/GUJARAT/AHM/${year}/${month}/${day}/${year}${month}${day}_${i}.jpeg`;
        createImageTag(str);
    }
}

function savePDF() {
    const doc = new jsPDF({ unit: 'px', format: [900.0, 640.0] });
    const imgs = document.getElementsByClassName('myImage');

    for (i = 0; i < imgs.length; i++) {
        doc.addImage(imgs[i], 'JPEG', 0, 0);
        if (i !== (imgs.length - 1)) {
            doc.addPage();
        }
    }
    doc.save(`${newsdate.value}_gujarat.pdf`)
}

function formatNumber(val) {
    return ("0" + "" + (val)).slice(-2)
}

function createImageTag(url) {
    var img = document.createElement('img');
    img.src = url;
    img.classList.add("myImage");
    imgsDiv.appendChild(img);
}

function printPDF() {
    setImageWidth();
    document.title = getTitle();
    setTimeout(() => { window.print() }, 10);
}

function setImageWidth() {
    const imgs = document.getElementsByClassName('myImage');

    let imgWidth = imgs[0].width;
    for (i = 0; i < imgs.length; i++) {
        imgWidth = Math.min(imgWidth, imgs[i].width);   
    }

    for (i = 0; i < imgs.length; i++) {
        imgs[i].style.width=imgWidth + "px";
    }
}

function getTitle() {
    val = newsdate.valueAsDate;
    year = val.getFullYear();
    month = formatNumber(val.getMonth() + 1);
    day = formatNumber(val.getDate());

    return `${year}${month}${day}_gujarat`;
}