import React, { useState, useEffect } from "react";
import drone from "../assests/001.gif";
import { ethers } from "ethers";
import ABI from "../Blockchain/ABI.json";
import { useAlert } from "react-alert";
import loading from "../assests/loading.gif";
import Timer from "./Timer";

const nftaddress = "0x5a37bC98D91049fE5fbdE9B7B9edAea719ce877A";
const Minting = () => {
  const alert = useAlert();
  const [status, setStatus] = useState("init");

  const [mintComplete, setMintComplete] = useState(false);
  const [address, setaddress] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [num, setNum] = useState(0);
  const [claims, setClaims] = useState(0);

  const [partyTime, setPartyTime] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (address != null) findClaims();
  }, [address]);

  useEffect(() => {
    const target = new Date("02/02/2022 12:00:00 PM UTC");
    // const target = new Date("01/31/2022 06:44:00 PM UTC");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.ethereum) window.ethereum.on("accountsChanged", connectWallet);
  }, []);

  const connectWallet = async () => {
    console.log("CONNET WALLET");
    // window.ethereum.request
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("No metamask");
      alert.error("Please use a browser with Metamask");
      return;
    }
    //check chain id
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x1") {
      console.log("Wrogn Chain");
      alert.error("Please use Etherium Mainnet ");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      let address = await signer.getAddress();
      console.log("ADDRESS", address);
      setaddress(address);
      setStatus("connected");
    } catch (err) {
      console.log(err);
      if (err.message.includes("unknown account")) {
        alert.error("Please connect your Metamask Wallet!");
      } else alert.error("Sorry, An Error Occured!");
      //   setShowMintedModal(false);
    }
  };

  const findClaims = async () => {
    if (address == null) {
      alert.error("Could not get address from metamas!");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftaddress, ABI, signer);
      const claim = await contract.availableClaims(address);
      setClaims(claim.toNumber());
    } catch (err) {
      console.log("error finding claims", err);
    }
  };

  const mint = async () => {
    if (num == 0) {
      alert.error("Sorry, cannot mint 0 drones.");
      return;
    }
    // window.ethereum.request
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      console.log("No metamask");
      alert.error("Please use a browser with Metamask");
      return;
    }
    //check chain id
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x1") {
      console.log("Wrogn Chain");
      alert.error("Please use Etherium Mainnet ");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.getDefaultProvider("inkeby", {
    //   infura: "https://mainnet.infura.io/v3/44c345ec9cac43e3a461dbfffe965e5d",
    // });
    setIsloading(true);

    try {
      // console.log(await signer.getAddress());
      const signer = provider.getSigner();
      // setaddress(await signer.getAddress());

      let contract = new ethers.Contract(nftaddress, ABI, signer);
      // console.log(contract);
      // let address = await signer.getAddress();
      // // console.log("ADDRESS", address);
      // setaddress(address);

      let transaction = await contract.claimToken(num);
      await transaction.wait();
      // console.log(transaction);

      // console.log(monstersarray);
      setIsloading(false);
      alert.success("Minted Successfully!");
      findClaims();
      setNum(0);
    } catch (err) {
      console.log(err);
      setIsloading(false);
      if (err.message.includes("unknown account")) {
        alert.error("Please connect your Metamask Wallet!");
      } else if (err.message.includes("Exceeds MAX_Supply")) {
        alert.error("Payment Failed,exeeded max supply!");
      } else if (err.message.includes("insufficient funds")) {
        alert.error("Payment Failed,Insufficient funds in your account!");
      } else if (err.message.includes("not on the White List")) {
        alert.error("Payment Failed,Your account is not on the Whitelist!");
      } else alert.error("Payment Failed, please try again!");
      //   setShowMintedModal(false);
    }
  };

  const InitComponent = () => {
    return (
      <>
        <div className="drone-bt-icon">
          <img src={drone} alt="drone" />
        </div>
        <p className="claim">CLAIM IS LIVE</p>
        <button onClick={connectWallet} className="connect">
          CONNECT METAMASK
        </button>
      </>
    );
  };

  const ClaimComponent = () => {
    return (
      <>
        <div className="drone-bt-icon">
          <img src={drone} alt="drone" />
        </div>
        <p className="claim">{claims} CLAIMS LEFT IN YOUR WALLET</p>
        <p className="" id="address-text">
          Connected with {address.slice(0, 5)}...{address.slice(-3)}
        </p>
        <p className="mint-num">
          CLAIM : {num} DRONES{" "}
          <button
            onClick={() => {
              if (num < claims) setNum(num + 1);
            }}
          >
            {" "}
            +
          </button>{" "}
          <button
            onClick={() => {
              if (num > 0) {
                setNum(num - 1);
              }
            }}
          >
            -{" "}
          </button>
        </p>
        <button onClick={mint} className="connect">
          MINT DRONES
        </button>
      </>
    );
  };

  const LoadingPopup = () => {
    return (
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <img src={loading} alt="Loading..." />
        </div>
      </div>
    );
  };

  return (
    <section className="mint-col">
      {isloading ? <LoadingPopup /> : null}
      {!partyTime ? (
        <>
          <p className="timer-title" style={{ color: "#fff" }}>
            MINT GOES LIVE IN
          </p>
          <p className="timer">
            {days} : {hours} : {minutes} : {seconds}
          </p>
        </>
      ) : mintComplete ? (
        <>
          <p className="claim" style={{ color: "#fff" }}>
            YOU HAVE CLAIMED ALL YOUR DRONE
          </p>
          <p className="claim" style={{ marginTop: "25px" }}>
            <a
              target="_blank"
              href="https://opensea.io/collection/afrodroids-by-owo"
            >
              VIEW COLLECTION ON OPENSEA{" "}
            </a>
          </p>
        </>
      ) : status == "init" ? (
        InitComponent()
      ) : status == "connected" ? (
        ClaimComponent()
      ) : null}
    </section>
  );
};

export default Minting;
