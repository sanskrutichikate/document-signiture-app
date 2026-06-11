import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer({ fileUrl, signaturePos, setSignaturePos }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // ✅ click handler inside PDF page
  const handlePageClick = (e, pageNumber) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSignaturePos({
      x,
      y,
      page: pageNumber
    });
  };

  return (
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <div
                key={pageNumber}
                style={{
                  position: "relative",
                  marginBottom: "20px"
                }}
                onClick={(e) => handlePageClick(e, pageNumber)}
              >
                <Page pageNumber={pageNumber} />

                {/* SIGNATURE BOX */}
                {signaturePos?.page === pageNumber && (
                  <div
                    style={{
                      position: "absolute",
                      left: signaturePos.x,
                      top: signaturePos.y,
                      border: "2px solid blue",
                      padding: "5px",
                      backgroundColor: "lightgreen",
                      cursor: "move",
                      zIndex: 9999
                    }}
                  >
                    Sign Here
                  </div>
                )}
              </div>
            );
          })}
      </Document>
    </div>
  );
}

export default PDFViewer;