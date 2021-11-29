import {ExifParserFactory} from "ts-exif-parser";
import * as Leaflet from "leaflet";

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
    console.log("updateCards was called!!");
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
            const cardDIV = generateCard(fileName);
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

function generateCard(fileName: string){
    // Calls functions to generate the parts of an individual card.
    // Calls each helper function to create individual card element.
    let cardDIV = createCardDiv();
    let cardBody = createCardBody();
    let cardTitle = createCardTitle(fileName);
    let cardSubTitle = createCardSubTitle(fileName);
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
    cardDIV.style.width = "18rem";
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

function createCardSubTitle(fileName: string){
    // Create card subtitle text
    let cardSubTitle = window.document.createElement("h6");
    cardSubTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    const hashes = imgHashGenerator(fileName);
    cardSubTitle.innerHTML = hashes + "<br>";

    return cardSubTitle;
}

function imgHashGenerator(fileName:string){
    // return MD5 and SHA1 hashes of image
    return fileName;
}

function createCardBodyText(fileName: string){
    // Create card body text
    let cardBodyText = window.document.createElement("p");
    cardBodyText.classList.add("card-text");

    console.log(allDemTags[fileName]); // TESTING

    // Add date time information in local time and UTC
    if (!!allDemTags[fileName].DateTimeOriginal){
        //cardBodyText.innerHTML = allDemTags[fileName].DateTimeOriginal + "<br>";
        cardBodyText.innerHTML += epochUTCTime(allDemTags[fileName].DateTimeOriginal);
    } else {
        cardBodyText.innerHTML = "No Time / Date Information" + "<br>";
    }
    // Add Device type
    if (!!allDemTags[fileName].HostComputer){
        cardBodyText.innerHTML += allDemTags[fileName].HostComputer + "<br>";
    } else {
        cardBodyText.innerHTML += "No Host Info" + "<br>";
    }
    // Add GPS coords
    if (!!allDemTags[fileName].GPSLatitude && !!allDemTags[fileName].GPSLongitude){
        cardBodyText.innerHTML += GPStoAddress(allDemTags[fileName].GPSLatitude, allDemTags[fileName].GPSLongitude);
    } else {
        cardBodyText.innerHTML += "<strong>No Location Info</strong>" + "<br>";
    }


    return cardBodyText;
}

async function populateMarkers(file:any, tags:any, i:number){
    // If the file has a Lat & Long, then add. Else, ignore.
    if (!!tags.GPSLatitude && !!tags.GPSLongitude) {
        //console.log(tags) // shows all tag data in console. Array of tag data.
        let marker = Leaflet.marker([tags.GPSLatitude, tags.GPSLongitude]);
        markers.push(marker);
        marker.addTo(map).bindPopup(`${file.name}<br/><img alt='${file.name}' id='img${i}' width="50px" height="50px">`);
        marker.addEventListener("click", function (){
            addImageToMarker(i, file);
        });
    }
}

function addImageToMarker(i:number, file: any){
    // Creates fileReader to show thumbnails in the marker pins on the map
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
        // console.log(fileReader.result); // Shows the raw data of the image
        // console.log(window.document);
        let imgTag = window.document.getElementById(`img${i}`) as HTMLImageElement;
        // Cast HTML element to HTML image element
        //console.log(imgTag);
        if (typeof fileReader.result === "string") {
            // console.log(typeof fileReader.result);
            imgTag.src = fileReader.result;
        }
    }
    // Presents the thumbnail (blob) in the marker popup
    fileReader.readAsDataURL(file);
}

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object

    for (let i = 0; i < files.length; i++){
        let file = files[i];
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        let tags = output.tags;
        // console.log(tags.OriginalRawFileName) -> returns undefined
        // console.log(file.name) -> returns file name
        //allDemTags[tags.OriginalRawFileName] = tags;
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
    fetch(geoCache)
        .then(response => response.json())
        .then(data => console.log(data.address.village))
    return "test";
}

async function exportContent(){
    // EMPTY STUFF
}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('export-btn').addEventListener('change', exportContent, false);
}
