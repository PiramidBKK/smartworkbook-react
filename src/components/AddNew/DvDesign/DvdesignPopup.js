export default function DvdesignPopup(){
    useEffect(()=>{
        dispatch(fetchDvdesignsAction(id))
      },[id])
  
      const dvdesignData = dvdesigns?.data?.dvdesign
  
      console.log(dvdesignData);
}