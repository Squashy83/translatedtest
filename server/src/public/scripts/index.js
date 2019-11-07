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
            <div>Email: ${order.email}</div>
            <button class="edit-order-btn" data-order-id="${order.id}">
                Edit
            </button>
            <button class="delete-order-btn" data-order-id="${order.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${order.name}">
            </div>
            <div>
                Email: <input class="email-edit-input" value="${order.email}">
            </div>
            <button class="submit-edit-btn" data-order-id="${order.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-order-id="${order.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Orders
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-order-btn')) {
        addOrder();
    } else if (ele.matches('.edit-order-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-order-btn')) {
        deleteOrder(ele);
    }
}, false)


function addOrder() {
    var nameInput = document.getElementById('name-input');
    var emailInput = document.getElementById('email-input');
    var data = {
        order: {
            name: nameInput.value,
            email: emailInput.value
        },
    };
    httpPost('/api/orders/add', data)
        .then(() => {
            displayOrders();
        })
}


function showEditView(orderEle) {
    var normalView = orderEle.getElementsByClassName('normal-view')[0];
    var editView = orderEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(orderEle) {
    var normalView = orderEle.getElementsByClassName('normal-view')[0];
    var editView = orderEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var orderEle = ele.parentNode.parentNode;
    var nameInput = orderEle.getElementsByClassName('name-edit-input')[0];
    var emailInput = orderEle.getElementsByClassName('email-edit-input')[0];
    var id = ele.getAttribute('data-order-id');
    var data = {
        order: {
            name: nameInput.value,
            email: emailInput.value,
            id: id
        }
    };
	httpPut('/api/orders/update', data)
        .then(() => {
            displayOrders();
        })
}


function deleteOrder(ele) {
    var id = ele.getAttribute('data-order-id');
	httpDelete('/api/orders/delete/' + id)
        .then(() => {
            displayOrders();
        })
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

