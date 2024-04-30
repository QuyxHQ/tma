import React, { useState, useEffect } from "react";
import Ton from "../assets/ton.svg";
import Code from "../assets/qr.svg";
import Copy from "../assets/copy.svg";
import Mark from "../assets/white_check.svg";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";

const Popup = ({
  searchInput,
  activeButton,
  copiedText,
  copyToClipboard,
  setActiveButton,
  paymentLink,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (isCopied) timeoutId = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  const handleCopy = () => {
    copyToClipboard(paymentLink);
    setIsCopied(true);
  };

  return (
    <div className="popup bg-[#090909] rounded-t-3xl border-t-4 border-[#262626] p-8 rounded-md">
      <p className="name text-white text-center text-2xl font-semibold space-y-2">
        {searchInput}
      </p>
      <div className="text-white flex gap-2 items-center justify-center mb-6">
        <p>Price:</p>
        <img src={Ton} alt="TON" />
        <p>100.25</p>
      </div>

      <div className="flex items-center bg-[#262626] border rounded-full px-1 py-1 mb-4">
        <button
          className={`${
            toggle === 0 ? "bg-[#0e1721]" : ""
          } px-4 py-3 text-[13px] rounded-full md:px-8 md:text-base`}
          onClick={() => setToggle(0)}
        >
          Default
        </button>
        <button
          className={`${
            toggle === 1 ? "bg-[#0e1721]" : ""
          } flex text-[13px] gap-3 items-center px-4 py-3 rounded-full md:text-base md:px-8`}
          onClick={() => setToggle(1)}
        >
          <img src={Code} alt="QR Code" />
          Scan QR Code
        </button>
      </div>

      {toggle === 0 ? (
        <>
          {" "}
          <div className="flex items-center justify-between space-y-3">
            <p>Send to</p>
            <div className="flex items-center gap-2 mb-3">
              <p>0x5506...50E4</p>
              <button
                className="pointer"
                onClick={() => copyToClipboard("0x5506...50E4")}
              >
                <img src={Copy} alt="Copy" />
              </button>
            </div>
            {copiedText === "0x5506...50E4" && (
              <p className="text-green-500 text-sm">Copied!</p>
            )}
          </div>
          <div className="flex items-center justify-between space-y-3">
            <p>Message</p>
            <div className="flex items-center gap-2">
              <p>{searchInput}</p>
              <button
                className="pointer"
                onClick={() => copyToClipboard(searchInput)}
              >
                <img src={Copy} alt="Copy" />
              </button>
            </div>
            {copiedText === searchInput && (
              <p className="text-green-500 text-sm">Copied!</p>
            )}
          </div>
          <div className="space-y-2">
            <button className="bg-[#005AC3] w-full mt-4 px-3 py-4 rounded-md">
              <a href={paymentLink} className="block text-white text-center">
                Open Wallet
              </a>
            </button>

            <button
              className="bg-[#0c0c0c] w-full px-3 rounded-md py-4 flex items-center justify-center gap-2"
              onClick={handleCopy}
            >
              <img src={isCopied ? Mark : Copy} alt="Copy" />{" "}
              {isCopied ? "Copied!" : "Copy payment link"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center py-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <QRCode
                value={paymentLink}
                fgColor="#333"
                bgColor="#fff"
                size={160}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
