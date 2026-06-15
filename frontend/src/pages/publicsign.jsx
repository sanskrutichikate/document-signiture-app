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
const handleAccept = async () => {               //accept function
    try {
        await axios.post(
            `http://localhost:5000/api/signature/accept/${signatureData._id}`
        );

        alert("Document accepted successfully");
    } catch (error) {
        console.log(error);
    }
};


const handleReject = async () => {              //reject function
    try {
        const reason = prompt("Enter rejection reason");

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
        <div>
            <h1>Public Signature Page</h1>
            {signatureData ? (
                <div>
                    <p>Signer Email :{signatureData.signerEmail}</p>
                    <p>Status:{signatureData.status}</p>

                    <PDFViewer
                        fileUrl={`http://localhost:5000/${signatureData.fileId.filepath.replace(/\\/g, "/")}`}
                    />

                
                    
                    <button onClick={handleAccept}> Accept & Sign</button>{"       "}

                    <button onClick={handleReject}> Reject</button>
                    

                </div>
            ) : (
                <p>Loading</p>

            )}


        </div>
    );
}
export default PublicSign;