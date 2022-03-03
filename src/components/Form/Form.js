import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import './Form.css';

const Form = () => {
    const [items, setItems] = useState([0])
    const [dropDowns, setDropDown] = useState([]);
    const [data, setData] = useState([]);
    let option = 0

    const optinRef = useRef();
    const apinameRef = useRef();
    const reqapiRef = useRef();
    const resapiRef = useRef();
    const prRef = useRef();
    const imgRef = useRef();


    const placeholder = ["Project Name", "Client Name", "Panel Name", "Page Name", "Section/Screen Name", "Selector or Events Name"]

    useEffect(() => {
        setDropDown(placeholder[option]);
    }, [])

    const handleAddOption = (e) => {
        e.preventDefault();
        function shuffle(array) {
            return array.map(item => item);
        }
        var origin = ['1', '2', '3', '4', '5', '6', '7'];
        var myArray = shuffle(origin);
        var currentValue = null;
        const proceed = window.confirm("Are You Sure, You want to add this option?");
        if (proceed) {
            setItems([...items, items.length]);
            alert("New Option added");
            currentValue = myArray;

            if (!!currentValue) {
                console.log("current value is", currentValue);
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const apiname = apinameRef.current.value;
        const reqapi = reqapiRef.current.value;
        const resapi = resapiRef.current.value;
        const pr = prRef.current.value;
        const img = imgRef.current.value;
        const tableData = { apiname, reqapi, resapi, pr, img }

        fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tableData)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Data Inserted Successfully");
                    window.location.reload()
                }
            })



    }


    useEffect(() => {
        fetch("http://localhost:5000/data")
            .then(res => res.json())
            .then(data => setData(data))

    }, [])


    return (
        <div>

            {/*-------------- Task 1 Start------------------ */}
            <form className='common-style'>
                <center>
                    <h1>Task1</h1>
                    <hr />
                    <div className='inputField-container'>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Project Name" />
                        </div>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Client Name" />
                        </div>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Panel Name" />
                        </div>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Page Name" />
                        </div>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Section/Screen Name" />
                        </div>
                        <div>
                            <input type="radio" name="" id="" />  <input className='dropdowns' type="text" placeholder="Selector or Events Name" />
                        </div>
                        {items.map((item, idx) => <Dropdown item={item} idx={idx} dropDowns={dropDowns} ></Dropdown>
                        )}

                    </div>
                    <button
                        onClick={e => handleAddOption(e)}
                        type='button'

                    > Add New</button>

                </center>
            </form>

            <form className='common-style input-boxes-container'>
                <div className='input-boxes'>
                    <div>
                        <label htmlFor="">API Name</label> <br /> <input ref={apinameRef} type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Request API Parameter </label> <br /> <input ref={reqapiRef} type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Response API Parameter</label> <br /> <input ref={resapiRef} type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Process, Logic in short </label> <br /> <input ref={prRef} type="text" name="" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Upload Screen Image </label> <br /> <input ref={imgRef} type="text" name="" id="" />
                        <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>

                </div>

            </form>

            <div className='common-style'>
                <table className="table">
                    <thead>
                        <tr>

                            <th scope="col">API Name</th>
                            <th scope="col">Request API Parameter </th>
                            <th scope="col">Response API Parameter</th>
                            <th scope="col">Process, Logic in short</th>
                            <th scope="col">Upload Screen Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => <tr>
                                <td> {item.apiname}</td>
                                <td> {item.reqapi}</td>
                                <td> {item.resapi}</td>
                                <td> {item.pr}</td>
                                <td> {item.img}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {/*-------------- Task 1 End------------------ */}

            {/*-------------- Task 2 Start------------------ */}
            <div>

                <form className='common-style'>
                    <center>
                        <h1>Task 2</h1>
                        <button>FORM GENERATOR</button>
                    </center>
                </form>


            </div>

        </div >
    );
};

export default Form;