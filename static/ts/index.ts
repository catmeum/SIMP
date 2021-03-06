import {ExifParserFactory} from "ts-exif-parser";
import * as Leaflet from "leaflet";
import * as cryptojs from "crypto-js";
import { jsPDF } from 'jspdf';

// Creates the map
var map = new Leaflet.Map('map');

Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sets view to USA
map.setView([39.82, -98.58], 5);

// Start the file upload EXIF manipulation
let allDemTags: any = {};
let markers: any[] = [];

// TESTING - Setup for updating a card with image info
async function updateCards(file: any){
    /**
     <div class="card" style="width: 18rem;">
     <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
     <a href="#" class="card-link">Card link</a>
     <a href="#" class="card-link">Another link</a>
     </div>
     </div>
     */
    // Gets all elements with class = scroll and calls that constant scrollCards
    const scrollCards = window.document.getElementById('cards');
    // if the card has already been added, don't re-add card
        let fileName = file.name;
        if (!cardExists(scrollCards.childNodes, fileName)){
            const cardDIV = generateCard(file);
            // Adds cardDIV to the scrollCards Element
            scrollCards.appendChild(cardDIV);
            //console.log(scrollCards.childNodes);
        }
}

function cardExists(childNodes: any, fileName: string){
    for (let i = 0; i <childNodes.length; i++){
        //console.log(childNodes[i]);
        const cardChildren = childNodes[i].childNodes[0].childNodes;
        for (let j = 0; j < cardChildren.length; j++){
            if (cardChildren[j].textContent.includes(fileName)){
                return true;
            }
        }
    }
    return false;
}

function generateCard(file:any){
    // Calls functions to generate the parts of an individual card.
    // Calls each helper function to create individual card element.
    let fileName = file.name;
    let cardDIV = createCardDiv();
    let cardBody = createCardBody();
    let cardTitle = createCardTitle(fileName);
    let cardSubTitle = createCardSubTitle(file);
    let cardBodyText = createCardBodyText(fileName);

    // Appends each element contained in the CardBody to CardBody
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubTitle);
    cardBody.appendChild(cardBodyText);

    // Append contents to card body element
    cardDIV.appendChild(cardBody);
    return cardDIV;
}

function createCardDiv() {
    // Creates a new card DIV element which will contain the image information.
    let cardDIV = window.document.createElement("div");
    //cardDIV.style.width = "22rem";
    cardDIV.classList.add("card");
    return cardDIV;
}

function createCardBody(){
    // Create card body and add to DOM
    let cardBody = window.document.createElement("div");
    cardBody.classList.add("card-body");
    return cardBody;
}

function createCardTitle(fileName: string){
    // Create card Title text
    let cardTitle = window.document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = fileName;
    return cardTitle;
}

function createCardSubTitle(file:any){
    // Create card subtitle text
    let fileName = file.name;
    let cardSubTitle = window.document.createElement("h6");
    cardSubTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    let hash = imgHashGenerator(fileName);
    cardSubTitle.innerHTML = hash + "<br>";
    return cardSubTitle;
}

function imgHashGenerator(file: any) {
    // TODO: Fix hashing functionality. I think it's the file object that isn't being properly sent over
    console.log("THIS HASHING FUNCTION DOES NOT WORK")
    // return MD5 hash of image
    let imgHash = cryptojs.MD5(file);
    return imgHash;
}


function createCardBodyText(fileName: string){
    // Create card body text
    let cardBodyText = window.document.createElement("p");
    cardBodyText.classList.add("card-text");
    // Add date time information in local time and UTC
    if (!!allDemTags[fileName].DateTimeOriginal){
        cardBodyText.innerHTML += epochUTCTime(allDemTags[fileName].DateTimeOriginal);
    } else {
        cardBodyText.innerHTML = "No Time / Date Information" + "<br>";
    }
    // Add GPS coords
    if (!!allDemTags[fileName].GPSLatitude && !!allDemTags[fileName].GPSLongitude){
        cardBodyText.innerHTML += "Latitude: " + allDemTags[fileName].GPSLatitude + "<br>Longitude: " + allDemTags[fileName].GPSLongitude + "<br>";
        //cardBodyText.innerHTML += GPStoAddress(allDemTags[fileName].GPSLatitude, allDemTags[fileName].GPSLongitude);
    } else {
        cardBodyText.innerHTML += "<strong>No Location Info</strong>" + "<br>";
    }
    // Add Device type
    if (!!allDemTags[fileName].HostComputer){
        cardBodyText.innerHTML += allDemTags[fileName].HostComputer + "<br>";
    } else {
        cardBodyText.innerHTML += "No Host Info" + "<br>";
    }
    return cardBodyText;
}

async function populateMarkers(file:any, tags:any, i:number){
    // If the file has a Lat & Long, then add. Else, ignore.
    if (!!tags.GPSLatitude && !!tags.GPSLongitude) {
        //console.log(tags) // shows all tag data in console. Array of tag data.
        let marker = Leaflet.marker([tags.GPSLatitude, tags.GPSLongitude]);
        markers.push(marker);
        marker.addTo(map).bindPopup(`${file.name}<br/><img alt='${file.name}' id='img${i}' class="img-thumbnail">`);
        marker.addEventListener("click", function (){
            addImageToMarker(i, file);
        });
    }
}

function addImageToMarker(i:number, file: any){
    // Creates fileReader to show thumbnails in the marker pins on the map
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
        let imgTag = window.document.getElementById(`img${i}`) as HTMLImageElement;
        // Cast HTML element to HTML image element
        if (typeof fileReader.result === "string") {
            imgTag.src = fileReader.result;
        }
    }
    // Presents the thumbnail (blob) in the marker popup
    fileReader.readAsDataURL(file);
}

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object

    for (let i = 0; i < files.length; i++){
        // TODO: Test to ensure only image files are uploaded.
        let file = files[i];
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        let tags = output.tags;

        allDemTags[file.name] = tags;
        await updateCards(file);
        await populateMarkers(file, tags, i);

    }
    // takes all of the markers and adds them to the map
    let featureGroup = new Leaflet.FeatureGroup(markers);
    map.fitBounds(featureGroup.getBounds());

}

function epochUTCTime(epochTime: number){
    let d = new Date (epochTime * 1000);
    return (d.toUTCString().replace("GMT", " Local") + "<br>");
}

//TODO: HOW to return city (village), state, county, and country from fetching
function GPStoAddress(lat: number, long: number){
    let geoCache = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + long + "&format=json";
    fetch(geoCache, {
        mode: 'no-cors'
    })
        .then(response => response.json())
        .then(data => console.log(data.address.village))
    return "test<br>";
}

async function exportContent(){
    var modal = document.getElementById("modalWindow");
    modal.style.display = "block";
}

async function closeExportModal(){
    var modal = document.getElementById("modalWindow");
    modal.style.display = "none";
}

async function saveExport(evt:any){
    console.log("Save Export function run");
    console.log(evt);
    let name = evt.srcElement.name.value;
    let caseNum = evt.srcElement.casenum.value;
    let description = evt.srcElement.description.value;
    let filename = evt.srcElement.filename.value;
    // retrieve the content to export
    var pdf = new jsPDF('p','pt','a4');
    pdf.setFontSize(12);
    pdf.text("Simple Image Mapping Program Report", 20, 20);
    const curDate = new Date();
    pdf.text("PDF Export time: " + curDate.toLocaleString(), 275, 20);
    pdf.text(caseNum, 20, 36);
    pdf.text("Investigator Name: " + name, 20, 48);
    pdf.text(description, 20, 60);
    // dynamic content
    pdf.setFontSize(10);
    let allCards = document.getElementById("cards").innerText;
    console.log(allCards);
    pdf.text(allCards, 20, 85);
    // Exports pdf
    pdf.save(filename); // will save in current working dir
    // Once function is complete, it'll close itself.
    await closeExportModal();
}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('export-btn').addEventListener('mouseup', exportContent, false);
    document.getElementById('closeExport').addEventListener('mouseup', closeExportModal, false);
    document.getElementById('closeExport2').addEventListener('mouseup', closeExportModal, false);
    document.getElementById('export-form').addEventListener('submit', saveExport, false);
}