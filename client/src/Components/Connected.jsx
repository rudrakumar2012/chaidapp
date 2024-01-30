import { ethers } from "ethers";

const Connected = (props) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = props.state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.001") };
    const tx = await contract.buyChai(name, message, amount);
    await tx.wait();
    console.log("Transaction is successfull");
  };
  return (
    <div className="App">
      <h1>You are connected to Metamask</h1>
      <p>Metamask Account: {props.account}</p>
      <form onSubmit={buyChai}>
        <label>Name:</label>
        <input id="name"></input>
        <label>Message:</label>
        <input id="message"></input>
        <button>Pay</button>
      </form>
    </div>
  );
};

export default Connected;
