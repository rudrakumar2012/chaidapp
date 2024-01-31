import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Connected = (props) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [memos, setMemos] = useState([]);
  const { contract } = props.state;

  const buyChai = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.001") };
    const tx = await contract.buyChai(name, message, amount);
    await tx.wait();
    console.log("Transaction is successfull");
  };

  useEffect(()=>{
    const memoMessage = async()=>{
        const memos = await contract.getMemo();
        setMemos(memos);
    }
    contract && memoMessage();
  },[contract])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center font-sans text-lg">
      <img src="/images/chai-logo.png" alt="Chai Logo" className="w-32 h-32 mx-auto my-4"/>
      <h1 className="my-4">Welcome to Chai Dapp</h1>
      <p className="mb-4">Metamask Account: {props.account}</p>
      <form onSubmit={buyChai} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={name} onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <input id="message" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={message} onChange={(e) => setMessage(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={!name || !message}
        >Pay</button>
      </form>
      <div>
        <br />
      <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {memos.map((memo, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{memo.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{memo.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(memo.timestamp * 1000).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{memo.from}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Connected;
