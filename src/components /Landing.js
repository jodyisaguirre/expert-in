import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import Card from "./Card";
import SearchBar from "./SearchBar";


export default function Landing(){

    const [assetData, setAssetData]= useState([])
    const [initialData,setInitialData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets')
            .then(response =>{
                    setInitialData(response.data.data)
                    setAssetData(response.data.data)
                }
            );

        },[])

    useEffect(() => {
        if (searchTerm && searchTerm !== ""){
            const filteredAssets = assetData.filter(asset => {
                return asset.id.toLowerCase().includes(searchTerm.toLowerCase())
            })
            setAssetData(filteredAssets)
        }
        else{
            setAssetData(initialData)
        }
    },[searchTerm])

    function searchHandler(input){
        setSearchTerm(input)
    }

    return(
            <Fragment>
                <SearchBar
                    searchTerm={searchTerm}
                    onChange={searchHandler}
                    placeHolder={"Search"}
                />
                <ul>
                    {
                      assetData?.map(asset =>
                      <Card
                            changePercent24Hr={asset.changePercent24Hr}
                            explorer={asset.explorer}
                            id={asset.id}
                            marketCapUsd={asset.marketCapUsd}
                            maxSupply={asset.maxSupply}
                            name={asset.name}
                            priceUsd={asset.priceUsd}
                            rank={asset.rank}
                            supply={asset.supply}
                            symbol={asset.symbol}
                            volumeUsd24Hr={asset.volumeUsd24Hr}
                            vwap24Hr={asset.vwap24Hr}
                      />
                      )
                    }
                </ul>
            </Fragment>
    )
}