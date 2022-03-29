import { useState, useEffect} from 'react'
import axios from "axios"
import { Navigate } from "react-router-dom"

export default function Overview({ currentUser }) {

    const [inventories, setInventories] = useState([])
    const [searchTextLow, setSearchTextLow] = useState('')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`)            
            setInventories(response.data)
        })()        
    }, [])

    const searchedLow = inventories.map((inventory, index) => {
        return (
            <tr key={`id-${index}`}>
                {inventory.brandName.toUpperCase().includes(searchTextLow) ?
                    <>
                        <td>{inventory.brandName}</td>
                        <td>{inventory.unitCount}</td>
                    </>
                    :
                    <></>
                }
            </tr>
        )
    })

    const searched = inventories.map((inventory, index) => {
        return (
            <tr key={`id-${index}`}>
                {inventory.brandName.toUpperCase().includes(searchText) ?
                    <>
                        <td>{inventory.brandName}</td>
                        <td>{inventory.unitCount}</td>
                    </>
                    :
                    <></>
                }
            </tr>
        )
    })

    if (!currentUser) return <Navigate to="/login" />

    return (
        <div>
            
            <div className='flex-container'>
                <h3>Low Stock Inventory</h3>
            </div>
            <div className='flex-container'>
                <input
                    type="text"
                    placeholder="Filter inventory by name"
                    value={searchTextLow}
                    onChange={e => setSearchTextLow((e.target.value).toUpperCase())}
                />
            </div>
            <div className='flex-container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                        </tr>
                        {searchedLow}
                    </tbody>
                </table>
            </div>

            <div className='flex-container'>
                <h3>All Inventory</h3>
            </div>
            <div className='flex-container'>
                <input
                    type="text"
                    placeholder="Filter inventory by name"
                    value={searchText}
                    onChange={e => setSearchText((e.target.value).toUpperCase())}
                />
            </div>
            <div className='flex-container'>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                        </tr>
                        {searched}
                    </tbody>
                </table>       
            </div>

        </div>
    )
}