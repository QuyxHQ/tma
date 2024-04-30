import React from "react";
import Profile1 from "../assets/p1.svg";
import Profile2 from "../assets/p2.svg";
import Profile3 from "../assets/p3.svg";


import Pfp1 from "../assets/k3.svg";
import Pfp2 from "../assets/k2.svg";
import Pfp3 from "../assets/k1.svg";



import Verify from "./verify";

const Card = ({ id }) => {
  return (
    <div className="flex items-center w-[50%] gap-2 m-auto justify-center relative">
      <div className="w-[100%] h-full items-center justify-center absolute top-0 -left-[123px] transform skew-x-[18deg]">
        <div
          className={`md:flex duration-300  bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] card-border-effect rounded-md`}
        >
          <div className="bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] p-4 space-y-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={Profile1} alt="Profile" /> {/* Use img tag for SVG */}
                <span className="text-sm">Nerdydev</span>
                <Verify />
              </div>
            </div>
            <div className="md:h-auto h-auto rounded-lg relative overflow-hidden">
              <img
                src={Pfp1}
                alt="Profile"
                className="w-full h-full object-cover"
              />{" "}
              {/* Use img tag for SVG */}
            </div>

            <div className="space-y-1">
              <p className="text-[16px] font-medium">Blockchain Maester</p>
              <p className="whitespace-pre-line text-xs text-zinc-400 select-none">
                The formidable force in the blockchain realm, sculpting
                decentralized
                <span className="text-[#CC99FF]">...see more</span>
              </p>

              <div className="flex items-center">
                <div className="flex items-center gap-1 py-1">
                  <p className="text-[20px] text-[#ffd599]">$89.20</p>
                  <div className="flex text-zinc-500 items-center gap-1 text-sm">
                    <p>~</p>
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <p className="text-[14px] text-zinc-500">20 QXT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] h-full items-center justify-center z-10">
        <div
          className={`md:flex duration-300  bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] card-border-effect rounded-md`}
        >
          <div className="bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] p-4 space-y-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={Profile2} alt="Profile" /> {/* Use img tag for SVG */}
                <span className="text-sm">Moyinthegrait</span>
                <Verify />
              </div>
            </div>
            <div className="md:h-auto h-auto rounded-lg relative overflow-hidden">
              <img
                src={Pfp2}
                alt="Profile"
                className="w-full h-full object-cover"
              />{" "}
              {/* Use img tag for SVG */}
            </div>

            <div className="space-y-1">
              <p className="text-[16px] font-medium">Design Maverick</p>
              <p className="whitespace-pre-line text-xs text-zinc-400 select-none">
                A web3 design maverick, that fearlessly pioneers the future of
                digital aesthetics
                <span className="text-[#CC99FF]">...see more</span>
              </p>

              <div className="flex items-center">
                <div className="flex items-center gap-1 py-1">
                  <p className="text-[20px] text-[#ffd599]">$120.20</p>
                  <div className="flex text-zinc-500 items-center gap-1 text-sm">
                    <p>~</p>
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <p className="text-[14px] text-zinc-500">50 QXT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] h-full items-center justify-center absolute left-[248px] z-[999] top-0 transform -skew-x-[18deg] ">
        <div
          className={`md:flex duration-300  bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] card-border-effect rounded-md`}
        >
          <div className="bg-gradient-to-b from-[#150b04] via-[#0b030c] to-[#0b030c] p-4 space-y-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={Profile3} alt="Profile" /> {/* Use img tag for SVG */}
                <span className="text-sm">shortgirlintech</span>
                <Verify />
              </div>
            </div>
            <div className="md:h-auto h-auto rounded-lg relative overflow-hidden">
              <img
                src={Pfp3}
                alt="Profile"
                className="w-full h-full object-cover"
              />{" "}
              {/* Use img tag for SVG */}
            </div>

            <div className="space-y-1">
              <p className="text-[16px] font-medium">Codeforge</p>
              <p className="whitespace-pre-line text-xs text-zinc-400 select-none">
                Badass frontend virtuoso sculpting immersive user experiences
                <span className="text-[#CC99FF]">...see more</span>
              </p>

              <div className="flex items-center">
                <div className="flex items-center gap-1 py-1">
                  <p className="text-[20px] text-[#ffd599]">$80.20</p>
                  <div className="flex text-zinc-500 items-center gap-1 text-sm">
                    <p>~</p>
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <p className="text-[14px] text-zinc-500">30 QXT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
