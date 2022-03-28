import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function EditMedicine ({medicineToEdit, setMedicineToEdit}) {
    

    //This is just placeholder medicine to edit. This is going to be replaced by the medicine specific to the id params.
    // const [editForm, setMedicineToEdit] = useState({
    //     genericName: "",
    //     brandName: "",
    //     manufacturerName: "",
    //     productType: "",
    //     route: "",
    //     usedFor: "",
    //     unitCount: 0
    // }
        
    // )

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory/${id}`)
            .then(response => {
                setMedicineToEdit(response.data)
            })
    },[])
    
    const [form, setForm] = useState({
        genericName: "",
        brandName: "",
        manufacturerName: "",
        productType: "",
        route: "",
        usedFor: "",
        unitCount: 0
    })
    // console.log(id)


    const submitForm = (e) => {
        e.preventDefault()
        console.log(form)
        // axios.put(`url here`, form)
    }
    return(
        <>
            <h1>Edit Medicine</h1>

            <form onSubmit={submitForm}>
                <label htmlFor="genericName">Generic Name:</label>
                <input type="text" name="genericName" id="genericName" value={medicineToEdit.genericName} onChange={(e) => {setForm({...form, genericName: e.target.value})}}/>

                <label htmlFor="brandName">Brand Name: </label>
                <input type="text" name="brandName" id="brandName" value={medicineToEdit.brandName} onChange={(e) => {setForm({...form, brandName: e.target.value})}}/>

                <label htmlFor="manufacturerName">Manufacturer: </label>
                <input type="text" name="manufacturerName" id="manufacturerName" value={medicineToEdit.manufacturerName} onChange={(e) => {setForm({...form, manufacturerName: e.target.value})}}/>

                <label htmlFor="productType">Product Type: </label>
                <input type="text" name="productType" id="productType" value={medicineToEdit.productType} onChange={(e) => {setForm({...form, productType: e.target.value})}}/>

                <label htmlFor="route">Route: </label>
                <input type="text" name="route" id="route" value={medicineToEdit.route} onChange={(e) => {setForm({...form, route: e.target.value})}}/>

                <label htmlFor="usedFor">Used For: </label>
                <input type="text" name="usedFor" id="usedFor" value={medicineToEdit.usedFor} onChange={(e) => {setForm({...form, usedFor: e.target.value})}}/>

                <label htmlFor="unitCount">Unit Count: </label>
                <input type="number" name="unitCount" id="unitCount" value={medicineToEdit.unitCount} onChange={(e) => {setForm({...form, unitCount: e.target.value})}}/>
                
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}