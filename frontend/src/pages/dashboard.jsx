


import { useEffect, useState } from "react";
import PDFViewer from "../components/pdfviwer.jsx";


function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    useEffect(() => {
        fetchDocuments();

    }, []);

    const fetchDocuments = async () => {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/documents/my-documents",
            {
                headers: {
                    Authorization: token
                }
            }
        );


        const data = await response.json();


        console.log("Response:", data);

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
                            const pdfUrl = `http://localhost:5000/${doc.filepath.replace(/\\/g, "/")}`;
                            console.log("PDF URL:", pdfUrl);
                            setSelectedPdf(pdfUrl);
                        }}
                    >
                        Preview
                    </button>
                </div>
            ))}

            {selectedPdf && (
                <a
                    href={selectedPdf}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open Selected PDF
                </a>
            )}
        </div>
    );


}



export default Dashboard;
