async function fetchStockPrice(stockSymbol) {
    try {
        const apiKey = //'API_KEY_HERE';
        const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch stock price');
        }
        
        const data = await response.json();
        console.log('API Response:', data); 
        
        if (data.c && data.c > 0) {
            return data.c.toFixed(2);
        } else {
            throw new Error('Stock price not found in API response');
        }
    } catch (error) {
        console.error('Error fetching stock price:', error);
        return 'Price not found';
    }
}

async function displayStockPrice() {
    const stockSymbolInput = document.querySelector('input[name="stockSymbol"]');
    
    // Check if input element exists
    if (!stockSymbolInput) {
        console.error('Input element not found');
        return;
    }
    
    const stockSymbol = stockSymbolInput.value.trim().toUpperCase();
    
    const price = await fetchStockPrice(stockSymbol);
    document.querySelector('.stock-price').textContent = `Stock Price: $${price}`;
}
