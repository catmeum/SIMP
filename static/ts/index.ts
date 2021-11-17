import {ExifParserFactory} from "ts-exif-parser";

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object

    for (let file of files) {
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        console.log(output.tags);
    }

}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
