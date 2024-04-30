import React from "react";
import GradientLogo from "../Components/GradientLogo";
import { Link } from "react-router-dom";
import bgSvg from "../assets/glow.png";
import Card from "../Components/Card";

const Welcome = () => {
  return (
    <div className="cont">
      <div className="wrap grid place-items-center space-y-4 w-full">
        <div className="wrapper w-full flex flex-col justify-between gap-24">
          <div>
            <div className="w-full">
              <div className="nav-brand w-[8rem] m-auto mb-[3rem]">
                <a href="//quyx.xyz" target="_blank">
                  <GradientLogo />
                </a>
              </div>
            </div>

            <div className="card_cont w-full m-auto">
              <img src={bgSvg} className="absolute bg-glow" />

              <Card headerColor="#fff" textColor="#fff" bg="#000" />
            </div>

            <h3 className="text-center text-[26px] font-bold mt-[2rem] mb-[1rem]">
              Welcome to Quyx!
            </h3>

            <p
              className="text-center text-md px-2 md:text-md opacity-40 mx-auto"
              style={{ width: "92%", maxWidth: "28rem", lineHeight: "200%" }}
            >
              Web3 product that fearlessly pioneers the future of digital
              aesthetics with blockchain.
            </p>
          </div>

          <div className="res-dev mx-auto">
            <div className="w-[69%] m-auto flex gap-[10px] items-center text-[14px] mb-[1.5rem] justify-center">
              <input type="checkbox" id="dontShowAgain" name="dontShowAgain" />
              <label for="dontShowAgain">Don't show this page again</label>
            </div>

            <Link to="/Claimpage">
              <button className="bg-[#005AC3] text-white gap-2 text-[15px] px-2 py-[1.15rem] w-[100%] mx-auto rounded-lg cursor-pointer flex items-center justify-center">
                Launch app
                <i className="h h-arrow-up-right text-[25px] block mb-0" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
