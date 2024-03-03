"use client"
import { useState } from "react";
import { API, PresignedURL, ResultStatus } from "@/services/api";


export default function Home() {

    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            // Perform the upload logic or pass the selected file to another function


            // console.log("selectedFile.type:", selectedFile.type);


            const presignedURL = await API.getPresignedUrl(selectedFile);
            await API.uploadFile(selectedFile, presignedURL);
            await API.batchUpload(presignedURL);
            

            // // Replace 'YOUR_SIGNED_URL' with your actual signed URL
            // const signedUrl = 'https://isu-geo-data-dev.s3.amazonaws.com/upload/6fcd3d27-3993-462f-b9f1-edd82db98dab?AWSAccessKeyId=AKIA6FESAIB7HF2UTINC&Content-Type=application%2Fjson&Expires=1709448119&Signature=204Ns2zZqmYpdVM23s1cTAGy8ns%3D';
            // const formData = new FormData();
            // formData.append('file', selectedFile);

            // fetch(presignedURL.url, {
            //     method: 'PUT',
            //     body: formData,
            //     headers: {
            //         'Content-Type': selectedFile.type,
            //     },
            // })
            // .then(response => {
            //     if (!response.ok) {
            //         console.log("response:", response);                    
            //         throw new Error(`File upload failed: ${JSON.stringify(response)}`);
            //     }
            //     alert('File uploaded successfully!');
            // })
            // .catch(error => {
            //     alert(`Error: ${error.message}`);
            // });

            // console.log('Selected file:', selectedFile);
            // Add your logic for uploading the file using the signed URL or any other method
        } else {
            alert('Please select a file');
        }
    };


    return (
        <div>

            <div>
                <input type="file" name="qq" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload File11</button>
            </div>

        </div>
    );
}
