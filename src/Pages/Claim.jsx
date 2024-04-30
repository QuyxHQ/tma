import React, { useState } from "react";
import GradientLogo from "../Components/GradientLogo";
import Error from "../assets/alert.svg";
import Popup from "../Components/Popup";
import useContract from "../hooks/useContract";

const Claim = () => {
  const contract = useContract();

  const [input, setInput] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInput(value);

    // Updated regex pattern to disallow underscores (_) but allow hyphens (-)
    const nameRegex = /^[A-Za-z0-9\s]+(?:-[A-Za-z0-9\s]+)*(?<!-)$/;

    if (value.length > 3 && value.length < 129) {
      const isValidName = nameRegex.test(value);
      if (isValidName) {
        setCanProceed(true);
        setErrorMessage("");
      } else {
        setCanProceed(false);
        setErrorMessage("Username does not meet standard");
      }
    } else {
      setCanProceed(false);
      setErrorMessage("Username should not be less than 4 chars");
    }
  };

  const handleClaimUsername = async () => {
    if (isLoading || !contract || !input) return;
    setIsLoading(true);

    const username_status = await contract.getUsernameLinkStatus(input);
    setIsLoading(false);

    if (username_status != null) {
      // username has been minted
      setCanProceed(false);
      setErrorMessage("Oops! this username has been claimed");
      return;
    }

    setPopupOpen(true);
    setPaymentLink("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="cont bg-black text-white relative overflow-hidden">
      <div className="grid place-items-center space-y-4">
        <div>
          <div className="nav-brand w-[8rem] m-auto mb-[3rem]">
            <a href="//quyx.xyz" target="_blank">
              <GradientLogo />
            </a>
          </div>

          <h3 className="text-center text-2xl font-semibold mb-3">
            Claim your username
          </h3>

          <p
            className="text-center text-md text-[#cccccc] mx-auto font-extralight mb-2 md:text-md"
            style={{ lineHeight: "190%", width: "89%", maxWidth: "30rem" }}
          >
            Get unique usernames for profile cards, that can be connected to
            various social networks.
          </p>

          <div className=" text-[#609CE2] mb-[3rem]">
            <a href="" className="flex items-center justify-center gap-1">
              Learn more &raquo;
            </a>
          </div>

          <div className="blur-content res-dev mx-auto">
            <input
              type="text"
              id="input"
              className="w-full px-10 py-5 mb-2 bg-transparent rounded-full"
              placeholder="Enter username"
              value={input}
              onChange={handleInputChange}
            />

            <div className="flex items-center mt-2 ml-4">
              <label htmlFor="checkbox-circle">
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

          <div className="res-dev mx-auto">
            <button
              className="bg-[#005AC3] text-[15px] px-2 py-5 w-full rounded-pill mt-[1rem] disabled:bg-[#17191C] disabled:text-[#999999] disabled:cursor-not-allowed disabled:opacity-90"
              onClick={handleClaimUsername}
              disabled={!canProceed || isLoading}
            >
              {isLoading ? "Hold on..." : "Claim Username"}
            </button>
          </div>
        </div>
      </div>

      {popupOpen && (
        <div className="bottom-[0] z-10 popup absolute space-y-4 inset-0 flex transition duration-700 ease-in-out justify-center items-center bg-black bg-opacity-50">
          <Popup
            input={input}
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
