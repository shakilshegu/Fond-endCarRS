import React,{useState} from 'react'

const Profile = () => {
    const [licenseImage, setLicenseImage] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState('Pending');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          setLicenseImage(URL.createObjectURL(file));
        }
      };

      const handleVerification = () => {

        setVerificationStatus('Verified');
      };

  return (
    <div>
<div className="bg-gray-100 h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {/* User Photo */}
        <div className="mb-6">
          <img
            src="https://via.placeholder.com/150" // Replace with the URL of the user's photo
            alt="User Photo"
            className="rounded-full h-24 w-24 mx-auto"
          />
        </div>

        {/* User Details */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-gray-500">Web Developer</p>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <p>Email: john@example.com</p>
          <p>Phone: (123) 456-7890</p>
          {/* Add more details as needed */}
        </div>

        {/* License Photo Upload */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">License</h3>
          {licenseImage ? (
            <img src={licenseImage} alt="License Photo" className="w-full" />
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="mb-2"
              />
              <p className="text-gray-500">Upload your license image</p>
            </div>
          )}
        </div>

        {/* Verification */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Verification</h3>
          <p>Status: {verificationStatus}</p>
          {verificationStatus === 'Pending' && (
            <button
              onClick={handleVerification}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Verify License
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
