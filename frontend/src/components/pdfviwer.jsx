import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer({ fileUrl, signaturePos }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ position: "relative" }}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          )
        )}
      </Document>

      {signaturePos && (
        <div
          style={{
            position: "absolute",
            left: signaturePos.x,
            top: signaturePos.y,
            border: "2px dashed red",
            padding: "5px",
            backgroundColor: "white",
          }}
        >
          Sign Here
        </div>
      )}
    </div>
  );
}

export default PDFViewer;