import {ExifParserFactory} from "ts-exif-parser";
import * as Leaflet from "leaflet";

var map = new Leaflet.Map('map');

Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.setView([0, 0], 0);

var allDemTags: any = {};
var markers: any[] = [];

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object
    for (let i = 0; i < files.length; i++){
        let file = files[i];
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        let tags = output.tags;
        allDemTags[tags.OriginalRawFileName] = tags;
        if (!!tags.GPSLatitude && !!tags.GPSLongitude) {
            let marker = Leaflet.marker([tags.GPSLatitude, tags.GPSLongitude]);
            markers.push(marker);
            marker.addTo(map).bindPopup(`${file.name}<br/><img alt='${file.name}' id='img${i}' width="50px" height="50px">`);
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

            fileReader.readAsDataURL(file);
        }
    }

    let featureGroup = new Leaflet.FeatureGroup(markers);
    map.fitBounds(featureGroup.getBounds());
}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}