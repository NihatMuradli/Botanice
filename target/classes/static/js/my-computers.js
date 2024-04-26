document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const response = await fetch('http://localhost:5000/api/shop/accounts/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                location.replace("login.html");
                return;
            }

            const result = await response.json();

            if (result.shopId) {
                const addComputerForm = document.getElementById('addComputerForm');

                addComputerForm.addEventListener('submit', async function (event) {
                    event.preventDefault();

                    try {
                        const category = document.getElementById('computerCategory').value;
                        const model = document.getElementById('computerModel').value;
                        const price = parseInt(document.getElementById('computerPrice').value);
                        const description = document.getElementById('computerDescription').value;
                        const isNew = document.getElementById('computerIsNew').value;
                        const image = document.getElementById('computerImage').value;
                        const ram = parseInt(document.getElementById('computerRam').value);
                        const cpu = document.getElementById('computerCpu').value;
                        const rom = parseInt(document.getElementById('computerRom').value);
                        const romType = document.getElementById('computerRomType').value;
                        const os = document.getElementById('computerOs').value;
                        const gpu = document.getElementById('computerGpu').value;

                        const response = await fetch('http://localhost:5000/api/computers/addComputer', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                brand: category,
                                model: model,
                                price: price,
                                description: description,
                                isNew: isNew,
                                imagePath: image,
                                ram: ram,
                                cpu: cpu,
                                rom: rom,
                                romType: romType,
                                os: os,
                                gpu: gpu,
                                shop: { id: result.shopId },
                            }),
                        });

                        if (response.ok) {
                            console.log('Computer added successfully');
                            addComputerForm.reset();
                        } else {
                            console.error('Error adding computer:', response.status, response.statusText);
                            const errorContent = await response.json();
                            console.error('Error content:', errorContent);
                        }

                    } catch (error) {
                        console.error('Error during addComputerForm submission:', error);
                    }
                    location.reload();
                });

                resetNewComputerInputs.addEventListener('click', function () {
                    document.getElementById('computerCategory').value = '';
                    document.getElementById('computerModel').value = '';
                    document.getElementById('computerPrice').value = '';
                    document.getElementById('computerDescription').value = '';
                    document.getElementById('computerIsNew').value = '';
                    document.getElementById('computerImage').value = '';
                    document.getElementById('computerRam').value = '';
                    document.getElementById('computerCpu').value = '';
                    document.getElementById('computerRom').value = '';
                    document.getElementById('computerRomType').value = '';
                    document.getElementById('computerOs').value = '';
                    document.getElementById('computerGpu').value = '';
                });
                resetEditComputerInputs.addEventListener('click', function () {
                    document.getElementById('editcomputerCategory').value = '';
                    document.getElementById('editcomputerModel').value = '';
                    document.getElementById('editcomputerPrice').value = '';
                    document.getElementById('editcomputerDescription').value = '';
                    document.getElementById('editcomputerIsNew').value = '';
                    document.getElementById('editcomputerImage').value = '';
                    document.getElementById('editcomputerRam').value = '';
                    document.getElementById('editcomputerCpu').value = '';
                    document.getElementById('editcomputerRom').value = '';
                    document.getElementById('editcomputerRomType').value = '';
                    document.getElementById('editcomputerOs').value = '';
                    document.getElementById('editcomputerGpu').value = '';
                });
                const computersResponse = await fetch(`http://localhost:5000/api/computers/findComputersByShopId/${result.shopId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (computersResponse.ok) {
                    const computers = await computersResponse.json();
                    const tableBody = document.getElementById('table-body');
                    tableBody.innerHTML = '';

                    updateTable(computers);
                    const searchInput = document.getElementById('search');
                    let originalComputers; // To store the original list of computers

                    const originalComputersResponse = await fetch(`http://localhost:5000/api/computers/findComputersByShopId/${result.shopId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (originalComputersResponse.ok) {
                        originalComputers = await originalComputersResponse.json();
                    } else {
                        console.error('Error fetching computers:', originalComputersResponse.status, originalComputersResponse.statusText);
                    }

                    searchInput.addEventListener('input', function () {
                        const searchTerm = searchInput.value.toLowerCase().trim();

                        const filteredComputers = originalComputers.filter(computer => {
                            return computer.model.toLowerCase().includes(searchTerm);
                        });

                        updateTable(filteredComputers);
                    });

                    async function deleteComputer(computerId) {
                        try {
                            const response = await fetch(`http://localhost:5000/api/computers/deleteComputer/${computerId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });

                            if (response.ok) {
                                console.log('Computer deleted successfully');

                                const updatedComputersResponse = await fetch(`http://localhost:5000/api/computers/findComputersByShopId/${result.shopId}`, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                    },
                                });

                                if (updatedComputersResponse.ok) {
                                    const updatedComputers = await updatedComputersResponse.json();
                                    updateTable(updatedComputers);
                                } else {
                                    console.error('Error fetching updated computers:', updatedComputersResponse.status, updatedComputersResponse.statusText);
                                }
                            } else {
                                console.error('Error deleting computer:', response.status, response.statusText);
                            }
                        } catch (error) {
                            console.error('Error during deleteComputer:', error);
                        }
                    }
                    async function editComputer(computerId) {
                        try {
                            const existingComputerResponse = await fetch(`http://localhost:5000/api/computers/${computerId}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                    
                            if (existingComputerResponse.ok) {
                                const existingComputer = await existingComputerResponse.json();
                    
                                document.getElementById('editcomputerCategory').value = existingComputer.brand;
                                document.getElementById('editcomputerModel').value = existingComputer.model;
                                document.getElementById('editcomputerPrice').value = existingComputer.price;
                                document.getElementById('editcomputerDescription').value = existingComputer.description;
                                document.getElementById('editcomputerIsNew').value = existingComputer.isNew;
                                document.getElementById('editcomputerImage').value = existingComputer.imagePath;
                                document.getElementById('editcomputerRam').value = existingComputer.ram;
                                document.getElementById('editcomputerCpu').value = existingComputer.cpu;
                                document.getElementById('editcomputerRom').value = existingComputer.rom;
                                document.getElementById('editcomputerRomType').value = existingComputer.romType;
                                document.getElementById('editcomputerOs').value = existingComputer.os;
                                document.getElementById('editcomputerGpu').value = existingComputer.gpu;
                    
                                const editComputerModal = new bootstrap.Modal(document.getElementById('editComputerModal'), {
                                    keyboard: false
                                });
                                editComputerModal.show();
                    
                                const editComputerForm = document.getElementById('editComputerForm');
                                editComputerForm.addEventListener('submit', async function (event) {
                                    event.preventDefault();
                    
                                    try {
                                        const editedComputer = {
                                            id: computerId,
                                            brand: document.getElementById('editcomputerCategory').value,
                                            model: document.getElementById('editcomputerModel').value,
                                            price: parseInt(document.getElementById('editcomputerPrice').value),
                                            description: document.getElementById('editcomputerDescription').value,
                                            isNew: document.getElementById('editcomputerIsNew').value,
                                            imagePath: document.getElementById('editcomputerImage').value,
                                            ram: parseInt(document.getElementById('editcomputerRam').value),
                                            cpu: document.getElementById('editcomputerCpu').value,
                                            rom: parseInt(document.getElementById('editcomputerRom').value),
                                            romType: document.getElementById('editcomputerRomType').value,
                                            os: document.getElementById('editcomputerOs').value,
                                            gpu: document.getElementById('editcomputerGpu').value,
                                            shop: { id: result.shopId }, // Include shop information
                                        };
                    
                                        const editResponse = await fetch('http://localhost:5000/api/computers/editComputer', {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(editedComputer),
                                        });
                    
                                        if (editResponse.ok) {
                                            console.log('Computer edited successfully');
                                        } else {
                                            console.error('Error editing computer:', editResponse.status, editResponse.statusText);
                                            const errorContent = await editResponse.json();
                                            console.error('Error content:', errorContent);
                                        }
                                    } catch (error) {
                                        console.error('Error during editComputerForm submission:', error);
                                    }
                    
                                    location.reload();
                                });
                    
                            } else {
                                console.error('Error fetching existing computer details:', existingComputerResponse.status, existingComputerResponse.statusText);
                            }
                        } catch (error) {
                            console.error('Error during editComputer:', error);
                        }
                    }                    

                    tableBody.addEventListener('click', async function (event) {
                        if (event.target.classList.contains('btn-danger')) {
                            const computerId = event.target.getAttribute('data-computer-id');
                            if (computerId) {
                                await deleteComputer(computerId);
                            }
                        }
                    });
                    tableBody.addEventListener('click', async function (event) {
                        if (event.target.classList.contains('edit-computer-btn')) {
                            const computerId = event.target.getAttribute('data-computer-id');
                            if (computerId) {
                                await editComputer(computerId);
                            }
                        }
                    });
                    function updateTable(computers) {
                        tableBody.innerHTML = '';

                        computers.forEach(computer => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${computer.id}</td>
                                <td>${computer.model}</td>
                                <td><img src="${computer.imagePath}" alt="Computer Image" style="height: 100px;" onclick="openPhotoModal('${computer.imagePath}')"></td>
                                <td>${computer.price}</td>
                                <td><button class="btn btn-danger delete-computer-btn" data-computer-id="${computer.id}">Delete</button></td>
                                <td><button class="btn btn-primary edit-computer-btn" data-computer-id="${computer.id}">Edit</button></td>
                            `;
                            tableBody.appendChild(row);
                        });
                    }

                } else {
                    console.error('Error fetching computers:', computersResponse.status, computersResponse.statusText);
                }

            } else {
                console.error('Unable to retrieve shop information.');
            }
        } else {
            location.replace("login.html");
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});


