/******************************************************************************
 *                          Fetch and display orders
 ******************************************************************************/

displayOrders();


function displayOrders(event) {
    var ordertype = event.currentTarget.value;
    httpGet('/api/orders/all?orderby='+ordertype)
        .then(response => response.json())
        .then((response) => {
            var allOrders = response.orders;
            // Empty the anchor
            var allOrdersAnchor = document.getElementById('all-orders-anchor');
            allOrdersAnchor.innerHTML = '';
            // Append orders to anchor
            allOrders.forEach((order) => {
                allOrdersAnchor.innerHTML += getOrderDisplayEle(order);
            });
        });
};


function getOrderDisplayEle(order) {
    return `<div class="order-display-ele">

        <div class="normal-view">
            <div>Name: ${order.name}</div>
            <div>Date: ${order.date}</div>
        </div>
       
    </div>`;
}

function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

