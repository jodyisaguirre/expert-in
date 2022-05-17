import React, {useEffect, useRef, useState} from "react";

export default function Card(props){
    const {
        changePercent24Hr,
        explorer,
        id,
        marketCapUsd,
        maxSupply,
        name,
        priceUsd,
        rank,
        supply,
        symbol,
        volumeUsd24Hr,
        vwap24Hr
    }
    = props

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    const inputElement = useRef("")
    const [dollarAmount, setDollarAmount] = useState(0)
    const [currentAmount, setCurrentAmount] = useState(0)
    function handleClick(price){

        setCurrentAmount(dollarAmount/price)
    }
    function searchValue(){
        setDollarAmount(parseInt(inputElement.current.value))
    }

    return (
        <div className={"Card"}>
            <ul>
                <li>Symbol: {symbol}</li>
                <li>Name: {name}</li>
                <li>Rank: {rank}</li>
                <li>Price: {formatter.format(priceUsd)}</li>
                <li className={(changePercent24Hr > 0)?"Green":"Red"}>24hr Change: {changePercent24Hr}</li>
                <li>Explorer: {explorer}</li>
                <li>Market Cap: {formatter.format(marketCapUsd)}</li>
                <li>Max Supply: {maxSupply}</li>
                <li>Supply: {supply}</li>
                <li>24hr Volume: {formatter.format(volumeUsd24Hr)}</li>
                <li>Vwap: {vwap24Hr}</li>
                <li>Wallet: {currentAmount}</li>
            </ul>
            $<input ref={inputElement} onChange={searchValue}></input>
            <button onClick={()=>{handleClick(priceUsd)}}>Convert</button>
        </div>
    )
}