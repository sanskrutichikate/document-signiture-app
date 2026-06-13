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

                console.log(res.data);
                setSignatureData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSignature();
    }, [token]);

    const handleSign = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/signature/sign/${token}`
            );

            alert("Document signed successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Public Signature Page</h1>
            {signatureData ? (
                <div>
                    <p>Signer Email :{signatureData.signerEmail}</p>
                    <p>Status:{signatureData.status}</p>

                <PDFViewer fileUrl={`http://localhost:5000/${signatureData.fileId.path}`} />


                    <button onClick={handleSign}>
                        Sign Document
                    </button>
                </div>
            ) : (
                <p>Loading</p>

            )}


        </div>
    );
}
export default PublicSign;