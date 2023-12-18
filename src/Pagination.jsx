import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import "./pagination.css"
const Pagination = () => {
    const [data,setData]=useState([])
    const [pageNumber,setPageNumber]=useState(0)
    let perpage=5

    let displayingPages=pageNumber*perpage
     
    let displayingFunction=data.slice(displayingPages,displayingPages+perpage).map((item,i)=>{
        return <p>{item.id}.) {" "}{item.title}</p>
    })
    let totalButtons=Math.ceil(data.length/perpage)
    console.log(Math.ceil(4.5),data.length/perpage)
    console.log(totalButtons)
    const lst=[]
    for(let i=1;i<totalButtons+1;i++){
        lst.push(i)
    }
//    ...............react paginate function.....
    const changePage=({selected})=>{
    
        setPageNumber(selected)
    }


    useEffect(()=>{

    axios.get("https://dummyjson.com/products").then((res)=>{
        console.log(res.data)
        setData(res.data.products)}).catch((err)=>console.log(err.message))

    },[])


  return (
    <div>
     {data.length!=0?<>
        {/* {data.map((item)=>{
            return <li>{item.title}</li>
        })} */}
        {displayingFunction}
     </>:<>loading......</>}
     {/* <button onClick={()=>setPageNumber(pageNumber-1)}>previous</button>
     {lst.map((item)=>{
        return <button onClick={()=>setPageNumber(item-1)}>{item}</button>
     })}
     <button onClick={()=>setPageNumber(pageNumber+1)}>Next</button> */}
     <ReactPaginate 
     previousLabel={"Previous"}
     nextLabel={"Next"}
     pageCount={totalButtons}
     onPageChange={changePage}
     containerClassName={"paginateButtons"}
     previousLinkClassName='prevButton'
     nextLinkClassName='nextButton'
     disabledClassName='paginationDisabled'
     activeClassName='paginationActive'
     />
    </div>
  )
}

export default Pagination