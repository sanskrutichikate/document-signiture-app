import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PDFViewer from "../components/pdfviwer";

function PublicSign() {
    const { token } = useParams();
    const [signatureData, setSignatureData] = useState(null);

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/signature/public/${token}`
                );

                console.log("FULL RESPONSE:", res.data);
                console.log("FILE ID:", res.data.fileId);

                setSignatureData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSignature();
    }, [token]);

    // ACCEPT + SIGN
    const handleAccept = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/signature/sign/${token}`
            );

            await axios.post(
                `http://localhost:5000/api/signature/accept/${signatureData._id}`
            );

            alert("Document signed successfully");
        } catch (error) {
             console.log("ERROR RESPONSE:", error.response?.data);
            console.log(error);

        }
    };

    // REJECT
    const handleReject = async () => {
        try {
            const reason = prompt("Enter rejection reason");

            if (!reason) {
                alert("Rejection reason is required");
                return;
            }

            await axios.post(
                `http://localhost:5000/api/signature/reject/${signatureData._id}`,
                { reason }
            );

            alert("Document rejected");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">
                Public Signature Page
            </h1>

            {signatureData ? (
                <div>
                    <p className="text-lg mb-2">
                        Signer Email: {signatureData.signerEmail}
                    </p>

                    <p className="text-lg mb-4">
                        Status: {signatureData.status}
                    </p>

                    <PDFViewer
                        fileUrl={`http://localhost:5000/${signatureData.fileId.filepath.replace(
                            /\\/g,
                            "/"
                        )}`}
                    />

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleAccept}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Accept & Sign
                        </button>

                        <button
                            onClick={handleReject}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PublicSign;