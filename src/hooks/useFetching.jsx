import {useState} from "react";


export const useFetching = (cb)=>{
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  const fetching = async () => {
    try{
      setIsLoading(true)
      await cb()
    }catch(e){
      console.log(e.message)
      setErr(e.message)
      setTimeout(()=>setErr(""), 4000)
    }finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, err]
}