import { useState, useEffect } from "react";

const Memos = (props) => {
    const [memos, setMemos] = useState([]);
    const {contract} = props.state;

    useEffect(()=>{
        const memoMessage = async()=>{
            const memos = await contract.getMemo();
            setMemos(memos);
        }
        contract && memoMessage();
    },[contract])

    return (
        <>
        {memos.map((memo)=>{
            return <div>
                <p>{memo.name}</p>
                <p>{memo.message}</p>
                <p>{new Date(memo.timestamp * 1000).toLocaleString()}</p>
                <p>{memo.from}</p>
            </div>
        })}

        </>
    );
};

export default Memos;