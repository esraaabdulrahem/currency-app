import axios from 'axios'


export function GetStockInfo(symbol,key) {
	return axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`)
}

export function GetCurrencyToExchange(from,to,key) {
	return axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${key}`)
}