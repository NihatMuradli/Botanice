document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const response = await fetch('http://localhost:5000/api/shop/accounts/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (!response.ok) {
                this.location.replace("login.html");
            } else {
                const ordersResponse = await fetch(`http://localhost:5000/api/orders/findOrdersByShopId/${result.shopId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (ordersResponse.ok) {
                    const orders = await ordersResponse.json();
                    const ordersTableBody = document.getElementById('orders-table-body');

                    for (const order of orders) {
                        const customer = order.customer;
                        const orderItemsResponse = await fetch(`http://localhost:5000/api/orders/items/findShopOrderItemsByOrderId/${order.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        });

                        if (orderItemsResponse.ok) {
                            const orderItems = await orderItemsResponse.json();
                            const formattedOrderDate = new Date(order.orderDate).toLocaleString();

                            ordersTableBody.innerHTML += `
                                <tr>
                                    <td>${order.id}</td>
                                    <td>${formattedOrderDate}</td>
                                    <td>
                                        <ul>
                                            <li><strong>Ad:</strong> ${customer.fullname}</li>
                                            <li><strong>Ünvan:</strong> ${customer.address}</li>
                                            <li><strong>Telefon:</strong> ${customer.phoneNumber}</li>
                                            <li><strong>Email:</strong> ${customer.email}</li>
                                        </ul>
                                    </td>
                                    <td>
                                        ${orderItems.map(item => `
                                            <ol>
                                                <li>${item.computer.model}
                                                    <ul>
                                                        <li><strong>Qiyməti:</strong> ${item.computer.price} AZN</li>
                                                        <li><strong>Miqdarı:</strong> ${item.quantity} ədəd</li>
                                                        <li><strong>Ümumi qiymət:</strong> ${item.quantity * item.computer.price} AZN</li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        `).join('')}
                                    </td>
                                    <td>${orderItems.reduce((sum, item) => sum + item.quantity * item.computer.price, 0)} AZN</td>
                                </tr>`;
                        } else {
                            console.error('Error fetching order items:', orderItemsResponse.statusText);
                        }
                    }
                } else {
                    console.error('Error fetching orders:', ordersResponse.statusText);
                }
            }
        } else {
            this.location.replace("login.html");
        }
    } catch (error) {
        console.error('Error during validation:', error);
    }
});
