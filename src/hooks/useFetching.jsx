import {useEffect, useState} from "react";
import {errTimer} from "../tools/utils/wrappers"

export const useFetching = (cb)=>{
  const [isLoading, setIsLoading] = useState(null)
  const [err, setErr] = useState("")
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, [])

  const fetching = async (...args) => {
    try{
      setIsLoading(true)
      await cb(...args)
    }catch(e){
      console.log(e.message)
      setErr(e)
      errTimer(()=>setErr(""), 4000)
    }finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, err,didMount]
}