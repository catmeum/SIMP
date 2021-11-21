import {ExifParserFactory, ExifTags} from "ts-exif-parser";
import {type} from "os";

async function handleFileSelect(evt: any) {
    let files: File[] = evt.target.files; // FileList object
    //const filePairs: {file: File, tags: ExifTags}[] = [];
    const testArr = [];
    for (let file of files) {
        let buffer = await file.arrayBuffer();
        let parser = ExifParserFactory.create(buffer);
        let output = parser.parse();
        const tags = output.tags;
        tags.OriginalRawFileName = file.name;
        testArr.push(tags);
        //filePairs.push({file, tags});
    }
    console.log(testArr[0].OriginalRawFileName);
    //const filteredFilePairs = filePairs.filter(({file, tags}) => tags.Make === "Google");
    //console.log({filePairs, filteredFilePairs});
   /*for (let k in filePairs) {
       console.log();
   }*/
    let fileName = "TEST STRING";
    document.getElementById("data").innerHTML = fileName;
    // @ts-ignore
    //window.map = map;

}

document.onreadystatechange = function () {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
