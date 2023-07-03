import Form from 'react-bootstrap/Form';

function Qty({change, stockCount, currQty}) {
    const handleChange = (e) => {
        change(e.target.value)
    }
    return (
        <>
            <Form.Select onChange={handleChange} value={currQty} >
                {[...Array(stockCount)].map((e,i)=>{return(<option key={i+1}>{i+1}</option>)})}
            </Form.Select>                
        </>
    );
}

export default Qty;