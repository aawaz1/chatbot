"use client"
import React, { useState } from "react";

const Paymentform = () => {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handlePincodeChange = (e) => {
    const enteredPincode = e.target.value;
    setPincode(enteredPincode);

    if (enteredPincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${enteredPincode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            setCity(data[0].PostOffice[0].District);
            setState(data[0].PostOffice[0].State);
          } else {
            alert("Invalid PIN Code. Please try again.");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg w-96 mx-auto">
      <label className="block mb-2 font-semibold">Enter Pincode:</label>
      <input
        type="text"
        value={pincode}
        onChange={handlePincodeChange}
        maxLength="6"
        className="w-full p-2 border border-gray-400 rounded"
        placeholder="Enter PIN code"
      />

      <label className="block mt-4 font-semibold">City:</label>
      <input
        type="text"
        value={city}
        readOnly
        className="w-full p-2 border border-gray-400 rounded bg-gray-200"
      />

      <label className="block mt-4 font-semibold">State:</label>
      <input
        type="text"
        value={state}
        readOnly
        className="w-full p-2 border border-gray-400 rounded bg-gray-200"
      />
    </div>
  );
};

export default Paymentform;
