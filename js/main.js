// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    start();
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function start() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('savePDF').addEventListener('click', savePDF_1, false);
    document.getElementById('download').addEventListener('click', downloadFiles, false );
}

array = [];
maxLength = 1206.0;
maxWidth = 850.0;

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    for (var i = 0, f; f = files[i]; i++) {
        if (f.type.match('image.*')) {

            readFileAsDataImage(f);
        }
    }
}

function readFileAsDataImage(file) {

    let reader = new FileReader();
    reader.onload = function (e) {
        array.push(e.target.result);
    };

    reader.readAsDataURL(file);
}

function savePDF(evt) {
    doc = new jsPDF({ unit : 'px', format: [900.0, 640.0]});

    for (i = 0; i < array.length; i++) {
        doc.addImage(array[i],0 ,0 );
        if(i !== ( array.length - 1) )
        {
            doc.addPage();
        }
    }
    doc.save('a4.pdf')
    document.getElementById('files').value = '';
}


function downloadFiles() {
    //const f = document.getElementById('fileNames').value.split(',');
    downloadResources(['http://www.enewspapr.com/News/GUJARAT/AHM/2020/03/28/20200328_4.jpeg', 'http://www.enewspapr.com/News/GUJARAT/AHM/2020/03/28/20200328_5.jpeg'])
}

function downloadResources( srcList )
{    
    var i = 0;

    setInterval(function(){
        if(srcList.length > i){            
            var link = document.createElement("a");
            link.id=i;
            link.download = srcList[i];
            link.href = srcList[i];
            link.click();
            i++;
        }
    },1500);
}

function savePDF_1(evt) {
    const doc = new jsPDF({ unit : 'px', format: [900.0, 640.0]});
    const imgs = document.getElementsByClassName('myImage');
    for (i = 0; i < imgs.length; i++) {
        doc.addImage(imgs[i],0 ,0 );
        if(i !== ( imgs.length - 1) )
        {
            doc.addPage();
        }
    }
    doc.save('a4.pdf')    
}