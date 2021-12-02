# SIMP
SIMP: Simple Image Mapping Program\n
Ian Stroszeck & Gino Placella 

## Description
The Simple Image Mapping Program (SIMP) was created to assist forensic researchers and analysts in the mobile forensics field. This new fully dockerized, client-side data analysis tool which utilizes a metadata extractor, to collect the location data and then display it onto a map using the mapping API, Open Street Map. SIMP is a simple,  open-source web application running on a Flask backend and a node.js frontend that fills the demand for visual data acquisition and reporting. The tool takes the GPS location data to create a visualization of where the pictures were taken by applying the image’s positioning data to a map. The tool uses Typescript converted into JavaScript to communicate between executing EXIF analysis on the inputted images, contacting the mapping API used to display the bounding map, updating the web page with the carved data, and lastly creating the final report to be exported. The data used for the tool includes GPS coordinates, MD5 hashes, the GPS time and date the image was taken, and the image file name. 

## Usage
1. Download the ZIP file and unzip
2. Ensure you have Docker and docker-compose up and running
3. Run the command: `docker-compose up --build`

## Future Work
- Allow for sorting of table contents (scroll cards)
- Create link to image pin on the map from the card title
- Create a HTML/PDF Export that allows for the following information: Title, Investigator Name, Export Date, map screenshot, and all filtered EXIF data blocks.
