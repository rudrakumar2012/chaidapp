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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center font-sans text-lg">
      <h1 className="my-4">You are connected to Metamask</h1>
      <p className="mb-4">Metamask Account: {props.account}</p>
      <form onSubmit={buyChai} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <input id="message" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></input>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Pay</button>
      </form>
    </div>
  );
};

export default Connected;
