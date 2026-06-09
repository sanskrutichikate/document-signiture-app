import { useEffect, useState } from "react";
import PDFViewer from "../components/pdfviwer.jsx";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [signaturePos, setSignaturePos] = useState(null);

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

        console.log(data);

        if (Array.isArray(data)) {
            setDocuments(data);
        } else {
            console.log("API Error:", data);
        }
    };

    console.log(selectedPdf);

    return (
        <div>
            <h1>My Documents</h1>

            {documents.map((doc) => (
                <div key={doc._id}>
                    <p>{doc.filename}</p>
                    <p>{doc.filepath}</p>

                    <button
                        onClick={() => {
                            const pdfUrl = `http://localhost:5000/${doc.filepath.replace(
                                /\\/g,
                                "/"
                            )}`;

                            console.log("PDF URL:", pdfUrl);
                            setSelectedPdf(pdfUrl);
                        }}
                    >
                        Preview
                    </button>
                </div>
            ))}

            {selectedPdf && (
                <div
                    style={{
                        position: "relative",
                        border: "1px solid #ccc",
                        padding: "20px",
                        marginTop: "20px",
                        minHeight: "300px",
                    }}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();

                        setSignaturePos({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                        });
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <PDFViewer fileUrl={selectedPdf}
                         signaturePos={signaturePos} />

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

                </div>
            )}
        </div>
    );
}

export default Dashboard;
