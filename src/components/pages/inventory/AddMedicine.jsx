import axios from 'axios'
import { useState } from 'react'
import SearchApi from '../../SearchApi'

export default function AddMedicine ({ inventoryList, setInventoryList }) {
  const [form, setForm] = useState({
    genericName: '',
    brandName: '',
    manufacturerName: '',
    productType: '',
    route: '',
    usedFor: '',
    unitCount: 0,
    transactions: [
      {
        transType: 'add',
        transCount: 0,
        transNotes: 'New record',
        transOwner: 'System',
        transUpdatedBy: 'System'
      }
    ]
  })

  const submitForm = e => {
    e.preventDefault()
    console.log(form)
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, form)
      .then(response => {
        console.log(inventoryList, response.data)
        setInventoryList([...inventoryList, form])
      })
  }
  return (
    <>
      <div className='flex-container'>
        <h3>Manually Add Medicine</h3>
      </div>

      <div className='flex-container'>
        <div className='form-container'>
          <form onSubmit={submitForm}>
            <label htmlFor='genericName'>Generic Name:</label>
            <input
              type='text'
              name='genericName'
              id='genericName'
              onChange={e => {
                setForm({ ...form, genericName: e.target.value })
              }}
            />

            <label htmlFor='brandName'>Brand Name: </label>
            <input
              type='text'
              name='brandName'
              id='brandName'
              onChange={e => {
                setForm({ ...form, brandName: e.target.value })
              }}
            />

            <label htmlFor='manufacturerName'>Manufacturer: </label>
            <input
              type='text'
              name='manufacturerName'
              id='manufacturerName'
              onChange={e => {
                setForm({ ...form, manufacturerName: e.target.value })
              }}
            />

            <label htmlFor='productType'>Product Type: </label>
            <input
              type='text'
              name='productType'
              id='productType'
              onChange={e => {
                setForm({ ...form, productType: e.target.value })
              }}
            />

            <label htmlFor='route'>Route: </label>
            <input
              type='text'
              name='route'
              id='route'
              onChange={e => {
                setForm({ ...form, route: e.target.value })
              }}
            />

            <label htmlFor='usedFor'>Used For: </label>
            <input
              type='text'
              name='usedFor'
              id='usedFor'
              onChange={e => {
                setForm({ ...form, usedFor: e.target.value })
              }}
            />
            <p>
              <input type='submit' value='Submit' />
            </p>
          </form>
        </div>              
        <SearchApi form={form} setForm={setForm} />
      </div>
    </>
  )
}
