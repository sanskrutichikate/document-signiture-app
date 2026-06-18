import { useEffect, useState } from "react";
import PDFViewer from "../components/pdfviwer.jsx";
import axios from "axios";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
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
            console.log("Full API Error:", JSON.stringify(data, null, 2));
        }
    };

    // ✅ SAVE SIGNATURE REQUEST
    const saveSignature = async () => {
        console.log("SAVE BUTTON CLICKED");

        if (!signaturePos) {
            alert("Please click on the PDF first");
            return;
        }

        if (!selectedDocumentId) {
            alert("No document selected");
            return;
        }

        const token = localStorage.getItem("token"); // ✅ FIXED

        try {
            const response = await axios.post(
                "http://localhost:5000/api/signature/request",
                {
                    fileId: selectedDocumentId,
                    x: signaturePos.x,
                    y: signaturePos.y,
                    page: signaturePos.page,
                },
                {
                    headers: {
                        Authorization: token, // ✅ FIXED
                    },
                }
            );
             // 🔥 GET LINK FROM BACKEND
        const link = response.data.signingLink;

        console.log("PUBLIC SIGN LINK:", link);

        alert("Signing Link Created:\n" + link);

        // OPTIONAL: auto open link
        window.open(link, "_blank");

    } catch (error) {
        console.log("ERROR:", error.response?.data);
    }
};

           

    // ✅ UPLOAD PDF
    const uploadPdf = async () => {
        if (!pdfFile) {
            alert("Please select a PDF");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("pdf", pdfFile);

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/documents/upload",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("PDF Uploaded Successfully");
            fetchDocuments();

        } catch (error) {
            console.error(error);
            alert("Upload Failed");
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 p-6">

            <h1 className="text-3xl font-bold text-black mb-6">
                My Documents
            </h1>

            {/* UPLOAD SECTION */}
            <div className="bg-white shadow-md rounded-xl p-4 mb-6 flex gap-4 items-center">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="border p-2 rounded-lg"
                />

                <button
                    onClick={uploadPdf}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                    Upload PDF
                </button>
            </div>

            {/* DOCUMENT LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div
                        key={doc._id}
                        className="bg-white shadow-md rounded-xl p-5"
                    >
                        <p className="font-semibold">{doc.filename}</p>

                        <button
                            className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg"
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
            </div>

            {/* PDF VIEWER */}
            {selectedPdf && (
                <div className="relative mt-6 bg-white p-4 border rounded-lg">

                    <PDFViewer
                        fileUrl={selectedPdf}
                        signaturePos={signaturePos}
                        setSignaturePos={setSignaturePos}
                    />

                    {/* SIGNATURE BOX */}
                    {signaturePos && (
                        <div
                            className="absolute border-2 border-blue-500 bg-green-200 px-2 py-1 rounded"
                            style={{
                                left: signaturePos.x,
                                top: signaturePos.y,
                            }}
                        >
                            Sign Here
                        </div>
                    )}

                    <button
                        onClick={saveSignature}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Save Signature Position
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;