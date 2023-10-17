import React from 'react';
import './custom.scss';
import { useState } from 'react';


function ImageBg() {


  const [image,setImage]=useState(null);
  const [bgremover,setBgremover]=useState(null);

  const handleBg=()=>
  {
    const APIkey='NkP9E6eJTi3Z1diFTdn3ELyw'
    const url='https://api.remove.bg/v1.0/removebg'


    const formData=new FormData()
    formData.append('image_file',image, image.name)
    formData.append('size',"auto")

    fetch(url,{
      method:'POST',
      headers:{
        'X-api-key':APIkey
      },
      body:formData
    }).then((res)=>res.blob()).then((blob)=>
    {
      const reader=new FileReader()
      reader.onloadend=()=>setBgremover(reader.result)
      reader.readAsDataURL(blob)
    }).catch((error)=>
    {
      console.error(error)
    })
  
  }
  return (
    <div>
    <div className="container">
    <h1 className="font-semibold">Remove Background for your Image</h1>
    
    <input type="file" onChange={(e)=>{
      
      const file=e.target.files[0]
      setImage(URL.createObjectURL(file))
    
    }}></input>
    {image && (
      <div className="imageDisplay">
        <img src={image} alt="Selected" width="300"/>
      </div>
    )}
    <button className="bg-info remove" onClick={handleBg}>Remove Background</button>

    {bgremover && (
      <div>
        <h4>Processed Image:</h4>
        <img src={bgremover} alt="Processed" width="300" />
      </div>)
    }
    </div>
    </div>

    
  )
}

export default ImageBg;