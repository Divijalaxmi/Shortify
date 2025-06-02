import React, { useEffect } from 'react'
import './UrlForm.css'
import { useState } from 'react';

const UrlForm = () => {
    
    const [formData, setFormData] = useState({
        originalUrl:""
    });

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const [response,setResponse]=useState(false);
    const [shortUrl,setShortUrl] = useState("");

    const getShortenUrl = async ()=>{
        let responseData;
        await fetch('http://localhost:4000/shorten',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>{responseData=data});
        console.log(responseData);
        if(responseData){
            setResponse(true);
            setShortUrl(responseData.shortUrl);
        }
    }
   

  return (
    <div className="entire">
    <div className='url-form'>
      <form>
        <center>
        <label className='label' htmlFor=''>Enter Your Url</label>
        <br/>
        <input value={formData.originalUrl} onChange={changeHandler} name="originalUrl" type="text" className='input' />
        <br/>
        <button className='geturl' type='button' onClick={getShortenUrl}>Get Shorten Url</button>
        </center>
      </form>
      {response?
      <div>
        <p className='srtUrl'>Shortened URL: <a href={shortUrl} target='_blank' >{shortUrl}</a></p>
      </div>:""
    }
    </div>
    </div>
  )
}

export default UrlForm
