import { useEffect, useState } from "react";
import Web3 from "web3";
import Item from "./components/Item";
import List from "./components/List";
import { Navbar, Container, Button } from "react-bootstrap";
import styled, { createGlobalStyle } from "styled-components";
function App() {
  const web3 = new Web3(window.web3.currentProvider);
  const { ethereum } = window;
  let chainId = null;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [votes, setVotes] = useState();
  const [variants, setVariants] = useState([]);
  const [candidatesLength, setCandidatesLength] = useState(0);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  const checkIfMetamaskConnected = () => {
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) setIsMetamaskConnected(false);
      else if (accounts.length == 0) setIsMetamaskConnected(false);
      else setIsMetamaskConnected(true);
    });
  };

  const handleChainChanged = (_chainId) => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsMetamaskConnected(false);
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      setIsMetamaskConnected(true);
    }
  };

  const getChainId = async () => {
    chainId = await ethereum.request({ method: "eth_chainId" });
  };

  ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch((err) => {
      console.error(err);
    });

  const connect = () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          setIsMetamaskConnected(false);
        } else {
          setIsMetamaskConnected(false);
        }
      });
  };

  const loadContract = async () => {
    return await new web3.eth.Contract(
      [
        {
          constant: false,
          inputs: [
            {
              name: "_id",
              type: "uint256",
            },
          ],
          name: "removeCandidate",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "candidatesCount",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          name: "candidates",
          outputs: [
            {
              name: "id",
              type: "uint256",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "voteCount",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_name",
              type: "string",
            },
          ],
          name: "addCandidate",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_id",
              type: "uint256",
            },
          ],
          name: "voting",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
      ],
      "0xd9Bc5D1EEd01D7a05F3d0577CD0784443f2cF242"
    );
  };

  const handleVoting = async (id) => {
    checkIfMetamaskConnected();
    if (isMetamaskConnected) {
      const contract = await loadContract();
      const resultVoting = await window.contract.methods
        .voting(id)
        .send({ from: currentAccount });
    } else return;
  };

  useEffect(async () => {
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);
    getChainId();
    checkIfMetamaskConnected();
    window.contract = await loadContract();
    const arr = [];
    for (let index = 1; index <= 4; index++) {
      const voteResult = await window.contract.methods.candidates(index).call();
      const obj = {
        id: await voteResult.id,
        name: await voteResult.name,
        voteCount: await voteResult.voteCount,
      };
      arr.push(obj);
    }
    setVariants(arr);
    const numberOfcandidats = await window.contract.methods
      .candidatesCount()
      .call();

    setCandidatesLength(numberOfcandidats);
    console.log(isMetamaskConnected);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <StyledHeader>
        <h1 href="#home">Crypto Project</h1>
        {!isMetamaskConnected && (
          <Button variant="info" onClick={connect}>
            Connect
          </Button>
        )}
      </StyledHeader>
      <h2>{currentAccount}</h2>
      {candidatesLength === 0 ? null : (
        <List>
          {variants.map((variant) => (
            <Item {...variant} handleVoting={handleVoting} />
          ))}
        </List>
      )}
    </div>
  );
}

const StyledHeader = styled.header`
  width: 100vw;
  height: 10vh;
  background-color: white;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}
`;

export default App;
