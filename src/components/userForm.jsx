import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flag, User, Phone, Mail, CreditCard, Vote } from 'lucide-react';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';


function userForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [qrData, setQrData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "registrations"), data);
      console.log('Form submitted with ID:', docRef.id);
      setQrData(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
                  <input {...register("voterId", { required: "Voter ID is required" })} 
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter your Voter ID" />
                  {errors.voterId && <p className="text-red-500 text-sm">{errors.voterId.message}</p>}
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                <Flag className="w-5 h-5 mr-2 inline-block" /> Submit Registration
              </button>
            </form>

            {qrData && (
              <div className="mt-6 flex flex-col items-center">
                <p className="text-gray-700 text-sm mb-2">Your Registration QR Code:</p>
                <QRCodeCanvas value={qrData} size={128} />

              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              Your information is secure and will only be used for democratic purposes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userForm;
