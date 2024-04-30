import React from "react";
import GradientLogo from "../Components/GradientLogo";
import { Link } from "react-router-dom";
// import Card from "../Components/Card";
import Cards from "../assets/G_plain.svg";
import bgSvg from "../assets/glow.png";

const Welcome = () => {
  return (
    <div className="cont bg-black text-white">
      <div className="">
        <div className="wrap grid place-items-center h-[100vh]  space-y-4">
          <div className="wrapper">
            <div className="w-full">
              <div className="nav-brand w-[30%] m-auto mb-[1rem]">
                <GradientLogo />
              </div>
            </div>

            <div
              className="card_cont w-full  m-auto "
              style={{
                backgroundImage: `url(${bgSvg})`,
                backgroundSize: `cover`,
                //  borderRadius:`100%`,
                width: `100%`,
              }}
            >
              <img src={Cards} />
              {/* <Card /> */}
            </div>
            <h3 className="text-center text-[26px] font-bold mt-[2rem] mb-[1rem]">
              Welcome to Quyx!
            </h3>
            <p className="text-center text-sm md:text-md text-[#CCCCCC]">
              Web3 product that fearlessly pioneers the <br /> future of digital
              aesthetics with blockchain.
            </p>
            <div className="mt-[4rem] w-[69%] m-auto flex gap-[10px] items-center text-[14px] mb-[1.5rem]">
              <input type="checkbox" id="dontShowAgain" name="dontShowAgain" />
              <label for="dontShowAgain">Don't show this page again</label>
            </div>

            <Link to="/Claimpage">
              <button className="bg-[#005AC3] text-[15px] px-2 py-4 w-[90%] m-auto rounded-md cursor-pointer flex items-center justify-center">
                Launch app
                <i className="h h-arrow-up-right text-[28px] " />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
