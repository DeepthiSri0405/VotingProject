import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Flag, User, Phone, Mail, CreditCard, Vote, MapPin, Download } from "lucide-react";
import { db } from "../../firebaseConfig"; 
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

function UserForm() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [qrData, setQrData] = useState(null);
  const [address, setAddress] = useState(""); 

  // Watch for changes in voterId or aadhar
  const voterId = watch("voterId");
  const aadhar = watch("aadhar");

  /// so to vot e get register http://localhost:5173/getregister

  // Fetching address from Firestore based on Voter ID or Aadhar
  const fetchAddress = async (idType, idValue) => { // idtype === voterID and idValue ==893027
    try {
      const q = query(collection(db, "people"), where(idType, "==", idValue));
      const querySnapshot = await getDocs(q); //get request  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // console.log(userData);
        setAddress(userData.address || "Address not found");
        setValue("address", userData.address || ""); // auto filled address
      } else {
        setAddress("Address not found");// post 
        setValue("address", ""); //  if no address found empty 
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Handler function for  form submission
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "registrations"), data); //same like post req 
      console.log("Form submitted with ID:", docRef.id);
      setQrData(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Triggering  address fetching for / when  Voter ID or Aadhar changes
  React.useEffect(() => {
    if (voterId) fetchAddress("voterId", voterId);
    else if (aadhar) fetchAddress("aadhar", aadhar);
  }, [voterId, aadhar]);

  // Function to download QR Code
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrCodeCanvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "registration_qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Flag className="w-10 h-10 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Democratic Registration</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <User className="w-4 h-4 mr-2" /> Full Name
                  </label>
                  <input {...register("name", { required: "Full Name is required" })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 mr-2" /> Phone Number
                  </label>
                  <input {...register("phone", { required: "Phone Number is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" } })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number" />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 mr-2" /> Email Address
                  </label>
                  <input {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address" />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <CreditCard className="w-4 h-4 mr-2" /> Aadhar Number
                  </label>
                  <input {...register("aadhar", { required: "Aadhar Number is required", pattern: { value: /^[0-9]{12}$/, message: "Enter a valid 12-digit Aadhar number" } })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Aadhar number" />
                  {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar.message}</p>}
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <Vote className="w-4 h-4 mr-2" /> Voter ID
                  </label>
                  <input {...register("voterId")}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Voter ID" />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 mr-2" /> Address
                  </label>
                  <input {...register("address")}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="Fetching address..." readOnly value={address} />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                <Flag className="w-5 h-5 mr-2 inline-block" /> Submit Registration
              </button>
            </form>

            {qrData && (
              <div className="mt-6 flex flex-col items-center">
                <QRCodeCanvas id="qrCodeCanvas" value={qrData} size={128} />
                <button onClick={downloadQRCode} className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                  <Download className="w-4 h-4 mr-2" /> Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
