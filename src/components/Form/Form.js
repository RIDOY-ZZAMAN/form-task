import React, { useState, useRef, useEffect } from 'react';
import './Form.css';

const Form = () => {
    const [dropDowns, setDropDown] = useState(["Dropdowns", "Project Name", "Client Name", "Panel Name", "Page Name", "Section/Screen Name", "Selector or Events Name"]);
    const [data, setData] = useState([]);

    const optinRef = useRef();
    const apinameRef = useRef();
    const reqapiRef = useRef();
    const resapiRef = useRef();
    const prRef = useRef();
    const imgRef = useRef();



    const handleAddNew = (e) => {
        e.preventDefault();
        const Option = optinRef.current.value;
        const proceed = window.confirm("Are You Sure, You want to add this option?")
        if (proceed) {
            setDropDown([...dropDowns, Option]);
            alert("New Option added")
        }
        optinRef.current.value = "";

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

    console.log(data);

    return (
        <div>
            <form className='common-style'>
                <center>
                    <h1>Task1</h1>
                    <hr />
                    <strong> Enter the new option</strong>
                    <input type="text" placeholder=' Enter Drop Down Option' ref={optinRef} />
                    <button type='submit' onClick={(e) => handleAddNew(e)}>Add New</button>
                    <hr />
                    <select>
                        {
                            dropDowns.map((item, index) => <option key={index}>{item}</option>)
                        }

                    </select>
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

        </div>
    );
};

export default Form;