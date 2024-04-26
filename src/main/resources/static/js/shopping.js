document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('#categoryList li');
    const contentContainer = document.getElementById('content');
    const categorySearchInput = document.getElementById('categorySearch');
    const computerSearchInput = document.getElementById('computer-search-input');
    const noComputersMessage = document.getElementById('noComputersMessage');

    listItems.forEach((item) => {
        item.addEventListener('click', function () {
            const brand = item.id.toLowerCase();
            fetchComputersByBrand(brand);
            highlightSelectedCategory(item);
        });
    });

    categorySearchInput.addEventListener('input', function () {
        const searchTerm = categorySearchInput.value.toLowerCase();
        filterCategories(searchTerm);
    });

    computerSearchInput.addEventListener('input', function () {
        const searchValue = computerSearchInput.value.toLowerCase();
        fetchComputersByBrandOrModel(searchValue);
    });

    async function fetchComputersByBrand(brand) {
        try {
            const response = await fetch(`http://localhost:5000/api/computers/byBrand/${brand}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const computers = await response.json();
            displayComputers(computers);
        } catch (error) {
            console.error('Error fetching computers:', error);
            displayComputers([]);
        }
    }

    async function fetchComputersByBrandOrModel(searchValue) {
        try {
            const response = await fetch(`http://localhost:5000/api/computers/byBrandOrModel/${searchValue}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const computers = await response.json();
            displayComputers(computers);
        } catch (error) {
            console.error('Error fetching computers:', error);
            displayComputers([]);
        }
    }

    function displayComputers(computers) {
        contentContainer.innerHTML = '';

        if (computers.length === 0) {
            noComputersMessage.style.display = 'block';
        } else {
            noComputersMessage.style.display = 'none';

            computers.forEach((computer) => {
                const computerCard = createComputerCard(computer);
                contentContainer.appendChild(computerCard);
            });
        }
    }

    function filterCategories(searchTerm) {
        listItems.forEach((item) => {
            const category = item.innerText.toLowerCase();
            if (category.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function highlightSelectedCategory(selectedItem) {
        listItems.forEach((item) => {
            item.classList.remove('active');
        });
        selectedItem.classList.add('active');
    }

    function createComputerCard(computer) {
        const card = document.createElement('div');
        card.classList.add('box');

        const image = document.createElement('img');
        image.classList.add('img-fluid');
        image.src = computer.imagePath;
        image.alt = computer.model;
        image.addEventListener('click', function () {
            showDetailedInformationModal(computer);
        });
        card.appendChild(image);

        const brandBadge = createBadge('Marka:', computer.brand);
        const modelBadge = createBadge('Model:', computer.model);
        const priceBadge = createBadge('Qiymət:', `$${computer.price}`);
        const newBadge = createBadge('Yeni:', computer.isNew ? 'Bəli' : 'Xeyr');
        const phoneBadge = createBadge('Telefon:', computer.shop.phoneNumber);

        card.appendChild(brandBadge);
        card.appendChild(modelBadge);
        card.appendChild(priceBadge);
        card.appendChild(newBadge);
        card.appendChild(phoneBadge);

        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-primary');
        addButton.textContent = 'Səbətə at';
        addButton.addEventListener('click', function () {
            addToBasket(computer);
        });
        card.appendChild(addButton);

        return card;
    }

    function createBadge(label, value) {
        const badge = document.createElement('p');
        badge.innerHTML = `<span class="badge rounded-pill bg-primary">${label}</span> ${value}`;
        return badge;
    }

    function showDetailedInformationModal(computer) {
        const computerPhoto = document.getElementById('computerPhoto');
        computerPhoto.src = computer.imagePath;

        computerPhoto.classList.add('img-fluid-modal');

        document.getElementById('computerBrand').innerText = computer.brand;
        document.getElementById('computerModel').innerText = computer.model;
        document.getElementById('computerPrice').innerText = `$${computer.price}`;
        document.getElementById('computerDescription').innerText = computer.description;
        document.getElementById('computerIsNew').innerText = computer.isNew ? 'Yes' : 'No';
        document.getElementById('computerRAM').innerText = computer.ram;
        document.getElementById('computerCPU').innerText = computer.cpu;
        document.getElementById('computerROM').innerText = computer.rom;
        document.getElementById('computerROMType').innerText = computer.romType;
        document.getElementById('computerOS').innerText = computer.os;
        document.getElementById('computerGPU').innerText = computer.gpu;
        document.getElementById('phoneNumber').innerText = computer.shop.phoneNumber;

        $('#computerModal').modal('show');
    }

    // Basket functionality
    const basketModal = new bootstrap.Modal(document.getElementById('basketModal'));
    const openBasketButton = document.getElementById('open-basket-button');
    const clearBasketButton = document.getElementById('clear-basket-button');
    const confirmOrderButton = document.getElementById('confirm-order-button');
    const basketComputersTableBody = document.getElementById('basket-computers-table-body');
    const basketTotalPriceContent = document.getElementById('basket-total-price-content');
    const basketComputerCount = document.getElementById('basket-computer-count');
    const computersInBasket = [];

    openBasketButton.addEventListener('click', function () {
        displayBasketItems();
        basketModal.show();
    });

    clearBasketButton.addEventListener('click', function () {
        clearBasket();
        displayBasketItems();
    });

    function addToBasket(computer) {
        const existingComputer = computersInBasket.find(item => item.id === computer.id);

        if (existingComputer) {
            existingComputer.quantity++;
        } else {
            const basketItem = {
                id: computer.id,
                image: computer.imagePath,
                name: `${computer.brand} ${computer.model}`,
                value: computer.price,
                quantity: 1,
            };

            computersInBasket.push(basketItem);
        }

        updateBasketCount();
        saveBasketToLocalStorage();
    }

    function updateBasketCount() {
        const totalItems = computersInBasket.reduce((total, item) => total + item.quantity, 0);
        basketComputerCount.textContent = totalItems.toString();
    }

    function saveBasketToLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(computersInBasket));
    }

    function loadBasketFromLocalStorage() {
        const basketData = localStorage.getItem('basket');

        if (basketData) {
            computersInBasket.push(...JSON.parse(basketData));
            updateBasketCount();
        }
    }

    function displayBasketItems() {
        basketComputersTableBody.innerHTML = '';
        let totalValue = 0;

        computersInBasket.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.value}</td>
                <td><input type="number" class="form-control quantity-input" value="${item.quantity}" min="1"></td>
                <td class="total-value">${(item.value * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-delete" data-index="${index}">Delete</button></td>
            `;

            totalValue += item.value * item.quantity;
            basketComputersTableBody.appendChild(row);

            const deleteButton = row.querySelector('.btn-delete');
            deleteButton.addEventListener('click', function () {
                deleteBasketItem(index);
                displayBasketItems();
            });

            const quantityInput = row.querySelector('.quantity-input');
            quantityInput.addEventListener('input', function () {
                let quantity = parseInt(quantityInput.value, 10);
                quantity = Math.max(1, quantity <= 0 ? 1 : quantity);
                quantityInput.value = quantity;
                computersInBasket[index].quantity = quantity;
                const totalValueCell = row.querySelector('.total-value');
                totalValueCell.textContent = (item.value * quantity).toFixed(2);
                updateBasketTotalValue();
                updateBasketCount();
                saveBasketToLocalStorage();
            });

            quantityInput.addEventListener('blur', function () {
                if (isNaN(quantityInput.value) || quantityInput.value.trim() === '') {
                    quantityInput.value = 1;
                    computersInBasket[index].quantity = 1;
                    const totalValueCell = row.querySelector('.total-value');
                    totalValueCell.textContent = (item.value * 1).toFixed(2);
                    updateBasketTotalValue();
                    updateBasketCount();
                    saveBasketToLocalStorage();
                }
            });
        });

        basketTotalPriceContent.textContent = totalValue.toFixed(2);
    }

    function deleteBasketItem(index) {
        computersInBasket.splice(index, 1);
        updateBasketCount();
        updateBasketTotalValue();
        saveBasketToLocalStorage();
    }

    function updateBasketTotalValue() {
        let totalValue = 0;

        computersInBasket.forEach((item) => {
            totalValue += item.value * item.quantity;
        });

        basketTotalPriceContent.textContent = totalValue.toFixed(2);
    }

    function clearBasket() {
        computersInBasket.length = 0;
        updateBasketCount();
        saveBasketToLocalStorage();
    }

    loadBasketFromLocalStorage();

    const confirmOrderForm = document.getElementById('confirmOrderForm');

    confirmOrderForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerEmail = document.getElementById('customerEmail').value;

        const basketItems = getBasketItems();

        try {
            const existingCustomer = await checkIfCustomerExists(customerPhone);

            if (existingCustomer) {
                const customerId = existingCustomer.id;
                await createNewOrder(customerId, basketItems);
            } else {
                const newCustomerId = await createNewCustomer(customerName, customerAddress, customerPhone, customerEmail);
                await createNewOrder(newCustomerId, basketItems);
            }

            clearBasket();
            displayBasketItems();
        } catch (error) {
            console.error('Error creating order:', error);
        }
        function getBasketItems() {
            const basketData = localStorage.getItem('basket');
            return basketData ? JSON.parse(basketData) : [];
        }

        async function checkIfCustomerExists(phoneNumber) {
            try {
                const response = await fetch(`http://localhost:5000/api/customers/${phoneNumber}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const existingCustomer = await response.json();
                return existingCustomer;
            } catch (error) {
                console.error('Error checking if customer exists:', error);
                return null;
            }
        }

        async function createNewCustomer(name, address, phone, email) {
            try {
                const response = await fetch('http://localhost:5000/api/customers/addCustomer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: name,
                        address: address,
                        phoneNumber: phone,
                        email: email,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const newCustomer = await response.json();
                return newCustomer.id;
            } catch (error) {
                console.error('Error creating new customer:', error);
                throw error;
            }
        }

        async function createNewOrder(customerId, basketItems) {
            try {
                const orderResponse = await fetch('http://localhost:5000/api/orders/addOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customer: { id: customerId },
                    }),
                });

                if (!orderResponse.ok) {
                    throw new Error(`HTTP error! Status: ${orderResponse.status}`);
                }

                const newOrder = await orderResponse.json();

                for (const item of basketItems) {
                    await createOrderItem(newOrder.id, item);
                }
            } catch (error) {
                console.error('Error creating new order:', error);
                throw error;
            }
        }

        async function createOrderItem(orderId, item) {
            try {
                const response = await fetch('http://localhost:5000/api/orders/items/addOrderItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order: { id: orderId },
                        computer: { id: item.id },
                        quantity: item.quantity,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const newOrderItem = await response.json();
                return newOrderItem;
            } catch (error) {
                console.error('Error creating new order item:', error);
                throw error;
            }
        }
        Swal.fire({
            icon: "success",
            title: "Order",
            text: "Order Created",
            timer: 1200
        }).then(() => {
            location.reload();
        });


    });


    document.getElementById('asus').click();

});

