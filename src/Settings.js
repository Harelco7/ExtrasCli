const produrl = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/"
const localurl = "http://localhost:5048/api/"
const islocal = window.location.href.includes("localhost")

const getFavorites = (customerId, BusinessDetails = "no") => {
    console.log(customerId)
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(`${islocal? localurl:produrl}User/getFavorite/${customerId}/${BusinessDetails}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            });
    })
}

const boxSuggest = (customerId) => {
    return new Promise((resolve, reject) => {
    const requestOptions = {
        method: "GET",
      };
      
      fetch(`${islocal? "localhost:5048/api/":"https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/"}Orders/ShowOrders/${customerId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("*",result)
            resolve(result)
        })
        .catch((error) => {
            console.log(error)
            reject(false)
        });
    })
}

export { produrl, localurl, islocal, getFavorites , boxSuggest}