import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer({ fileUrl }) {
  return (
    <Document
      file={fileUrl}
      onLoadSuccess={() => console.log("PDF Loaded Successfully")}
      onLoadError={(error) => console.error("PDF Error:", error)}
    >
      <Page pageNumber={1} />
    </Document>
  );
}

export default  PDFViewer;