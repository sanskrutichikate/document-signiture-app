import { useEffect, useState } from "react";
import PDFViewer from "../components/pdfviwer.jsx";
import axios from "axios";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [signaturePos, setSignaturePos] = useState(null);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/documents/my-documents",
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        const data = await response.json();

        if (Array.isArray(data)) {
            setDocuments(data);
        } else {
            console.log("API Error:", data);
        }
    };


    const saveSignature = async (pos) => {

        console.log("SAVE BUTTON CLICKED");

        try {
            await axios.post("http://localhost:5000/api/signature/save", {
                fileId: selectedDocumentId,
                signer: "6a2576def0a7f58d2c289ba2",
                x: signaturePos.x,
                y: signaturePos.y
            });

            alert("Saved Successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>My Documents</h1>

            {/* DOCUMENT LIST */}
            {documents.map((doc) => (
                <div key={doc._id}>
                    <p>{doc.filename}</p>
                    <p>{doc.filepath}</p>

                    <button
                        onClick={() => {
                            const pdfUrl = `http://localhost:5000/${doc.filepath.replace(/\\/g, "/")}`;
                            setSelectedPdf(pdfUrl);
                            setSelectedDocumentId(doc._id);
                            setSignaturePos(null);
                        }}
                    >
                        Preview
                    </button>
                </div>
            ))}

            {/* PDF VIEWER */}
            {selectedPdf && (
                <div
                    style={{
                        position: "relative",
                        border: "1px solid #ccc",
                        marginTop: "20px",
                    }}
                >
                    <PDFViewer
                        fileUrl={selectedPdf}
                        signaturePos={signaturePos}
                        setSignaturePos={setSignaturePos}
                    />

                    {/* SIGNATURE BOX */}
                    {signaturePos && (
                        <div
                            style={{
                                position: "absolute",
                                left: signaturePos.x,
                                top: signaturePos.y,
                                border: "2px solid blue",
                                padding: "5px",
                                backgroundColor: "lightgreen",
                                cursor: "move",
                                zIndex: 9999,
                            }}
                        >
                            Sign Here
                        </div>


                    )}
                    <button
                        onClick={() => {
                            console.log(signaturePos);
                            saveSignature(signaturePos);
                        }}
                    >
                        Save Signature Position
                    </button>

                </div>
            )}
        </div>
    );
}

export default Dashboard;