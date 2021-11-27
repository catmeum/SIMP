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
async function updateCards(){
    let imageName: string = "";
    let imageMake: string = "";
    let imageDateTime: number = 0;
    let imageLat: number = 0;
    let imageLong: number = 0;
    let imageAltitude: number = 0;
}

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object
    for (let i = 0; i < files.length; i++){
        let file = files[i];
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        let tags = output.tags;
        // Huh above and below
        allDemTags[tags.OriginalRawFileName] = tags;
        // If the file has a Lat & Long, then add. Else, ignore.
        if (!!tags.GPSLatitude && !!tags.GPSLongitude) {
            console.log(tags) // shows all tag data in console. Array of tag data.
            let marker = Leaflet.marker([tags.GPSLatitude, tags.GPSLongitude]);
            markers.push(marker);
            marker.addTo(map).bindPopup(`${file.name}<br/><img alt='${file.name}' id='img${i}' width="50px" height="50px">`);
            // Creates fileReader to show thumbnails in the marker pins on the map
            let fileReader = new FileReader();
            fileReader.onloadend = function () {
                // @ts-ignore
                let interval = setInterval(() => {
                    try {
                        // @ts-ignore
                        window.document.getElementById(`img${i}`).src = fileReader.result;
                    } catch (e) {
                        // keep going
                    }
                }, 100);

            }
            // Presents the thumbnail (blob) in the marker popup
            fileReader.readAsDataURL(file);
        }
        // TESTING - Add each image info to a card on the left sidebar
        // window.document.getElementById("card").
    }

    let featureGroup = new Leaflet.FeatureGroup(markers);
    map.fitBounds(featureGroup.getBounds());
}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
