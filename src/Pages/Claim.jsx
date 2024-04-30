import React, { useState } from "react";
import GradientLogo from "../Components/GradientLogo";
import Check from "../assets/check-circle .svg";
import Error from "../assets/alert.svg";
import Popup from "../Components/Popup";

const Claim = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false); 
  const [copiedText, setCopiedText] = useState(""); 
  const [activeButton, setActiveButton] = useState("");
  const [paymentLink, setPaymentLink] = useState(""); 

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    setIsLoading(true);

    // Updated regex pattern to disallow underscores (_) but allow hyphens (-)
    const nameRegex = /^[A-Za-z\s]+(?:-[A-Za-z\s]+)*(?<!-)$/;

    if (value.length > 3 && value.length < 129) {
      const isValidName = nameRegex.test(value);
      if (isValidName) {
        setIsLoading(false);
        setIsNameAvailable(true);
        setErrorMessage("");
      } else {
        setIsLoading(false);
        setIsNameAvailable(false);
        setErrorMessage("Name is not available");
      }
    } else {
      setIsLoading(false);
      setIsNameAvailable(false);
      setErrorMessage("Input a valid name.");
    }
  };

  const handleClaimUsername = () => {
    setPopupOpen(true);
    
    setPaymentLink("https://evaa.finance/");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text); 
    setTimeout(() => setCopiedText(""), 2000); 
  };

  return (
    <div className="cont bg-black text-white relative overflow-hidden">
      <div className="grid place-items-center h-[100vh] space-y-4">
        <div>
          <div className="nav-brand w-[30%] m-auto mb-[4rem]">
            <GradientLogo />
          </div>
          <h3 className="text-center text-2xl font-semibold mb-2">
            Claim your username
          </h3>
          <p className="text-center text-sm text-[#cccccc] font-extralight mb-2 md:text-md">
            Get unique usernames for profile cards, that
            <br /> can be connected to various social networks.
          </p>
          <div className=" text-[#609CE2] mb-[3rem]">
            <a href="" className="flex items-center justify-center gap-1">
              Learn more
              <i className="h h-arrow-right text-[22px] text-[#609CE2]" />
            </a>
          </div>
          <div className="blur-content">
            <input
              type="text"
              id="searchInput"
              className="w-full px-4 py-3 bg-transparent rounded-full border border-slate-300"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
            />
            <div className="flex items-center mt-2 ml-4">
              <label htmlFor="checkbox-circle" className="">
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <svg
                      className="animate-spin w-4 h-4 text-gray-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z" />
                      <path d="M22 12c0-5.523-4.477-10-10-10V0a12 12 0 0 1 12 12h-2zM2 12c0 5.523 4.477 10 10 10v2A12 12 0 0 1 2 12z" />
                    </svg>
                    <p className="text-gray-500">Checking availability...</p>
                  </div>
                ) : isNameAvailable ? (
                  <div className="flex items-center gap-3">
                    <img src={Check} className="w-[15px]" alt="Check" />
                    <p className="text-green-500 text-sm md:text-md">
                      Name is available!
                    </p>
                  </div>
                ) : errorMessage ? (
                  <div className="flex items-center gap-3">
                    <img src={Error} className="w-[15px]" alt="Error" />
                    <p className="text-red-500 text-sm md:text-md">
                      {errorMessage}
                    </p>
                  </div>
                ) : null}
              </label>
            </div>
          </div>
          <button
            className="bg-[#005AC3] text-[15px] px-2 py-4 w-full rounded-md mt-[11rem] disabled:bg-[#17191C] disabled:text-[#999999] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleClaimUsername}
            disabled={!isNameAvailable || isLoading} 
          >
            {isLoading ? "Checking..." : "Claim Username"}
          </button>
        </div>
      </div>
      {popupOpen && (
        <div className="bottom-[0] z-10 popup absolute space-y-4 inset-0 flex transition duration-700 ease-in-out justify-center items-center bg-black bg-opacity-50">
          <Popup
            searchInput={searchInput}
            activeButton={activeButton}
            copiedText={copiedText}
            copyToClipboard={copyToClipboard}
            setActiveButton={setActiveButton}
            paymentLink={paymentLink}
          />
        </div>
      )}
    </div>
  );
};

export default Claim;
