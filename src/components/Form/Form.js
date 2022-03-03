import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import './Form.css';

const Form = () => {
    const [items, setItems] = useState([]);
    const [formItems, setFormItems] = useState([])
    const [dropDowns, setDropDown] = useState([]);
    const [data, setData] = useState([]);
    const [buttonClick, setButtonClick] = useState(false);
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
        const proceed = window.confirm("Are You Sure, You want to add this option?");
        if (proceed) {
            setItems([...items, items.length]);
            alert("New Option added");

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

        fetch('https://floating-sierra-01269.herokuapp.com/data', {
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
        fetch("https://floating-sierra-01269.herokuapp.com/data")
            .then(res => res.json())
            .then(data => setData(data))

    }, [])

    const handleON = (e) => {
        e.preventDefault();
        setButtonClick(true)

    }

    const handleOFF = (e) => {
        e.preventDefault();
        setButtonClick(false)

    }

    const handleFormAdd = (e) => {
        e.preventDefault();
        setFormItems([...formItems, formItems.length])

    }



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
                        <button onClick={(e) => handleON(e)}>FORM GENERATOR</button>
                        {
                            buttonClick && <div className="ParentModal">
                                <div className='singleModal'>
                                    <div className='singleModalContainer'>
                                        <button onClick={(e) => handleOFF(e)} className='cancel-form'>X</button>

                                        <h2>Form Generator</h2>
                                        <hr />
                                        <div className='Form-Name'>
                                            <h4>Name of the form is</h4>
                                            <input type="text" name="" id="" />
                                            <button onClick={(e) => handleFormAdd(e)}>Add Field</button>


                                        </div>

                                        <div className='newlyAddedField'>
                                            <h4>Field Name</h4>
                                            {
                                                formItems.map((item, index) => <div className='newAddedField'>
                                                    <input type="text" />

                                                </div>)
                                            }


                                        </div>

                                    </div>

                                </div>
                            </div>
                        }

                    </center>
                </form>


            </div>

        </div >
    );
};

export default Form;