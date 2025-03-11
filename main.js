console.log("main.js is working");

const populate = async (value, baseCurrency) => {
    const apiKey = "cur_live_xWiveKvr79sDRaELT7d5GFCNlKNz9hZqRHGOuGWS";
    const URL = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${baseCurrency}`;

    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        let rJson = await response.json();
        console.log(rJson);

        let myStr = "";
        for (let key in rJson["data"]) {
            let exchangeRate = rJson["data"][key]["value"];
            let convertedValue = (value * exchangeRate).toFixed(2); // Rounds to 2 decimal places

            myStr += `
                <tr>
                    <td>${key}</td>
                    <td>${rJson["data"][key]["code"]}</td>
                    <td>${convertedValue}</td>
                </tr>
            `;
        }

        document.querySelector("tbody").innerHTML = myStr;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Button clicked!");

    const value = parseFloat(document.querySelector("#quantity").value);
    const currency = document.querySelector("#currency").value;

    if (!value || value <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    populate(value, currency);
});
