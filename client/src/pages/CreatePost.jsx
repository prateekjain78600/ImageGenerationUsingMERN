import React,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField,Loader } from '../components'

const CreatePost = () => {
  const navigate=useNavigate();
  const[form,setform]=useState({
    name:'',
    prompt:'',
    photo:'',
  });
  const [generatingImg,setGeneratingImg]=useState(false);
  const [loading,setloading]=useState(false);
  
  const generateImage=async()=>{
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response=await fetch('http://localhost:8080/api/v1/generate',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({prompt:form.prompt}),
        })
        const data=await response.json();
        setform({...form,photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)

      }finally{
        setGeneratingImg(false)
      }
    }
    else{
      alert('please enter a prompt')
    }

  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    if(form.prompt  || form.photo){
      setloading(true);
      try {
        const response=await fetch('http://localhost:8080/api/v1/post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      }
      finally{
        setloading(false);
      }
    }
    else{
      alert("please enter a promot");
    }
  }
  const handleChangeName =(e)=>{
    setform({...form,name : e.target.value})
  }
  const handleChangePrompt =(e)=>{

    setform({...form,prompt : e.target.value})
  }
  const handleSurpriseMe =()=>{
    const randomPrompt=getRandomPrompt(form.prompt);
    console.log(randomPrompt)
    setform({...form,prompt:randomPrompt});
  }
  return (
    <section className='max-w-7xl mx-auto'>
    <div>
    <h1 className="font-extrabold text=[#222328] text-[32px]">Create Post</h1>
    <p className="mt-2 text-[#666e75] text-[16px] max-w-auto">Create and imiginative and visually stunning images through Genrating and share them with the community</p>
  </div>
  <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
  <div className='flex flex-col gap-5'>
  <FormField
  labelName="Your Name"
  type="text"
  name="name"
  placeholder="Ex., john doe"
  value={form.name}
  handleChange={handleChangeName}
/>

<FormField
  labelName="Prompt"
  type="text"
  name="prompt"
  placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
  value={form.prompt}
  isSurpriseMe
  handleChange={handleChangePrompt}
  handleSurpriseMe={handleSurpriseMe}
/>

        <div className='relative bg-gray-50 border border-gray-50text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
        {form.photo ?(
          <img 
          src={form.photo}
          alt={form.photo}
          className="w-full h-full object-contain"
          />
        ):(
          <img 
          src={preview} 
          alt="preview" 
          className="w-9/12 h-9/12 object-contain opacity-40"
          />
        )}
        {generatingImg && (
          <div className='absolute  insert-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg w-full h-full'>
          <Loader/></div>
        )}
        
        </div>

  </div>
  <div className='mt-5 gap-5 flex'>
  <button
      type='button'
      onClick={generateImage}
      className='text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center'
    >{generatingImg?"generating...":"generate"}
    </button>
  </div>
  <div className='mt-10'>
      <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want,you can share with others in the community</p>
      <button 
      type='submit'
      className='text-white bg-[#6469ff] font-medium rounded-md text-sm w-full px-5 py-2.5 text-center mt-2'>
      {loading?'loading...':"share with the community"}
      </button>
          
  </div>
  </form>
    </section>
  )
}

export default CreatePost
