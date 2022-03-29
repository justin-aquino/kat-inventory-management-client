import axios from 'axios'
import { useState } from 'react'

export default function SearchApi ({ currentUser }) {
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    genericName: '',
    brandName: '',
    manufacturerName: '',
    productType: '',
    route: '',
    usedFor: '',
    unitCount: 0
  })  

    const [apiResponse, setApiResponse] = useState(null)

  const endPoint = `https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:"${search}"`

  const [result, setResult] = useState([])
  const [brandName, setBrandName] = useState([]) // brand_name
  const [genericName, setGenericName] = useState([]) // generic_name
  const [manufacturerName, setManufacturerName] = useState([]) // manufacturer_name
  const [productType, setProductType] = useState([]) // product_type
  const [route, setRoute] = useState([]) // route
  const [substanceName, setSubstanceName] = useState([]) // substance_name

  function fetchAPI (endpoint) {
    try {
      axios
        .get(endPoint)
        .then(response => {          
          setBrandName(
            response.data.results[0].patient.drug[0].openfda.brand_name
          )
          setGenericName(
            response.data.results[0].patient.drug[0].openfda.generic_name
          )
          setManufacturerName(
            response.data.results[0].patient.drug[0].openfda.manufacturer_name
          )
          setProductType(
            response.data.results[0].patient.drug[0].openfda.product_type
          )
          setRoute(response.data.results[0].patient.drug[0].openfda.route)
          setSubstanceName(
            response.data.results[0].patient.drug[0].openfda.substance_name
          )
          setApiResponse(response.status)
        })
        .catch(error => {
          setApiResponse(error.response.status)
        })
    } catch (error) {
      setApiResponse(error)
      console.log(apiResponse)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    fetchAPI(endPoint)
  }

  const listBrandName = brandName.map((brand, index) => {
    return (
      <>
        <option value={brand} key={`brand-${index}`}>{brand}</option>
      </>
    )
  })
  const listGenericName = genericName.map((generic, index) => {
    return (
      <>
        <option value={generic} key={`generic-${index}`}>{generic}</option>
      </>
    )
  })
  const listManufacturerName = manufacturerName.map((manufacturer, index) => {
    return (
      <>
        <option value={manufacturer} key={`mfg-${index}`}>{manufacturer}</option>
      </>
    )
  })
  const listProductType = productType.map((producttype, index) => {
    return (
      <>
        <option value={producttype} key={`prodtype-${index}`}>{producttype}</option>
      </>
    )
  })
  const listRoute = route.map((route, index) => {
    return (
      <>
        <option value={route} key={`route-${index}`}>{route}</option>
      </>
    )
  })
  const listSubstanceName = substanceName.map((substance, index) => {
    return (
      <>
        <option value={substance} key={`subs-${index}`}>{substance}</option>
      </>
    )
  })
  const handleApiForm = e => {
    e.preventDefault()    
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, form)
      .then(response => {
        setResult(`Saved to inventory.`)
        setSearch('')       
        // setForm({...form, unitCount:0})  
      })
      .catch(error =>
        setResult(`Something went wrong. Please contact your administrator.`)
      )
  }

  return (
    <>
      <div className='flex-container'>
        <h3>Search FDA Database </h3>         
      </div>
     
      <div className='flex-container'>
        <form onSubmit={handleSearch}>
          <label htmlFor='search'></label>
          <input
            type='text'
            id='search'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='search'
          />
          <button type='submit'> Search </button>
        </form>
        
      </div>
      <div className='flex-container'>{result}</div>
     
      {search !== '' ? (
        <form onSubmit={handleApiForm}>
          <div className='form-container'>
           
            <label htmlFor='brandName'>Brand Name </label>
            <select
              id='brandName'
              onChange={e => setForm({ ...form, brandName: e.target.value })}
            >
              <option value=''></option>
              {listBrandName}
            </select>
            <label htmlFor='genericName'>Generic Name </label>
            <select
              id='genericName'
              onChange={e => setForm({ ...form, genericName: e.target.value })}
            >
              <option value=''></option>
              {listGenericName}
            </select>
            <label htmlFor='manufacturerName'>Manufacturer Name </label>
            <select
              id='manufacturerName'
              onChange={e =>
                setForm({ ...form, manufacturerName: e.target.value })
              }
            >
              <option value=''></option>
              {listManufacturerName}
            </select>
            <label htmlFor='productType'>Product Type </label>
            <select
              id='productType'
              onChange={e => setForm({ ...form, productType: e.target.value })}
            >
              <option value=''></option>
              {listProductType}
            </select>
            <label htmlFor='route'>Route</label>
            <select
              id='route'
              onChange={e => setForm({ ...form, route: e.target.value })}
            >
              <option value=''></option>
              {listRoute}
            </select>
            <label htmlFor='substanceName'>Substance Name </label>
            <select
              id='substanceName'
              onChange={e =>
                setForm({ ...form, substanceName: e.target.value })
              }
            >
              <option value=''></option>
              {listSubstanceName}
            </select>
            {/* <label htmlFor='unitCount'>Unit Count </label>
            <input
              type='text'
              id='unitCount'
              value={form.unitCount}
              onChange={e => setForm({ ...form, unitCount: e.target.value })}
            /> */}
            <button type='submit'>Save</button>
          </div>          
        </form>
        
      ) : (
        <></>
      )}
      
    </>
  )
}
