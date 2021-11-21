import {ExifParserFactory, ExifTags} from "ts-exif-parser";

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object
    const filePairs: {file: File, tags: ExifTags}[] = [];
    for (let file of files) {
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        const tags = output.tags;
        filePairs.push({file, tags})
    }
    const filteredFilePairs = filePairs.filter(({file, tags}) => tags.LensMake === "Apple");
    console.log({filePairs, filteredFilePairs});
    // @ts-ignore
    window.map = map;

}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
