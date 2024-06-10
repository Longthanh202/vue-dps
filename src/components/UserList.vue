<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">User List</h1>

        <!-- Button Create Post -->
        <div class="flex justify-end mb-4">
            <button @click="openModal('add')"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add User</button>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div
                    class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">{{ modalTitle }}</h3>
                                <div class="mt-2">
                                    <div v-if="modalType === 'detail'" class="overflow-x-auto">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Name:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Username:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.username }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Email:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.email }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Phone:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.phone }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Website:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.website }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Address:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{
                                                        selectedUser.address.street }}, {{ selectedUser.address.city }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                        Company:</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">{{ selectedUser.company.name
                                                        }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div v-else>
                                        <div class="grid grid-cols-2 gap-4">
                                            <input v-model="selectedUser.name"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Name" />
                                            <input v-model="selectedUser.username"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Username" />
                                            <input v-model="selectedUser.email"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Email" />
                                            <input v-model="selectedUser.phone"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Phone" />
                                            <input v-model="selectedUser.website"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Website" />
                                            <input v-model="selectedUser.address.street"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Street" />
                                            <input v-model="selectedUser.address.city"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="City" />
                                            <input v-model="selectedUser.address.zipcode"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Zipcode" />
                                            <input v-model="selectedUser.company.name"
                                                class="border border-gray-300 rounded p-2 w-full mb-2"
                                                placeholder="Company Name" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button v-if="modalType !== 'detail'" @click="saveUser" @keyup.enter="saveUser"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 hover:bg-green-700 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                        </button>
                        <button @click="showModal = false"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table -->
        <table>
            <thead class="bg-gray-300 text-black">
                <tr>
                    <th class="py-2" style="width: 10%;">ID</th>
                    <th class="py-2" style="width: 15%;">Name</th>
                    <th class="py-2" style="width: 15%;">Username</th>
                    <th class="py-2" style="width: 20%;">Email</th>
                    <th class="py-2" style="width: 40%;">Action</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                <tr v-for="(user) in paginatedUsers" :key="user.id">
                    <td class="border px-4 py-2 text-center" style="width: 10%;">{{ user.id }}</td>
                    <td class="border px-4 py-2" style="width: 20%;">{{ user.name }}</td>
                    <td class="border px-4 py-2" style="width: 20%;">{{ user.username }}</td>
                    <td class="border px-4 py-2" style="width: 20%;">{{ user.email }}</td>
                    <td class="border px-4 py-2 text-center" style="width: 20%;">
                        <button @click="openModal('edit', user)"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button @click="deleteUser(user.id)"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button @click="openModal('detail', user)"
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                            <i class="fa fa-info"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-4 flex justify-start items-center space-x-1">
            <a href="#"
                class="relative inline-flex items-center
            px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                @click.prevent="prevPage" :class="{ 'cursor-not-allowed': page === 1 }"
                :disabled="page === 1">Previous</a>
            <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                @click.prevent="nextPage" :class="{ 'cursor-not-allowed': page * perPage >= users.length }"
                :disabled="page * perPage >= users.length">Next</a>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            users: [],
            selectedUser: {
                name: '',
                username: '',
                email: '',
                phone: '',
                website: '',
                address: {
                    street: '',
                    city: '',
                    zipcode: ''
                },
                company: {
                    name: ''
                }
            },
            showModal: false,
            modalType: 'add',
            page: 1,
            perPage: 5,
        };
    },
    computed: {
        paginatedUsers() {
            const start = (this.page - 1) * this.perPage;
            return this.users.slice(start, start + this.perPage);
        },
        modalTitle() {
            return this.modalType === 'add' ? 'Add New User' : this.modalType === 'edit' ? 'Edit User' : 'User Details';
        }
    },
    methods: {
        fetchUsers() {
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(data => {
                    this.users = data;
                });
        },
        openModal(type, user = null) {
            this.modalType = type;
            this.selectedUser = user ? { ...user } : {
                name: '',
                username: '',
                email: '',
                phone: '',
                website: '',
                address: {
                    street: '',
                    city: '',
                    zipcode: ''
                },
                company: {
                    name: ''
                }
            };
            this.showModal = true;
        },
        saveUser() {
            const method = this.modalType === 'add' ? 'POST' : 'PUT';
            const url = this.modalType === 'add' ? 'http://localhost:3000/users' : `http://localhost:3000/users/${this.selectedUser.id}`;

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.selectedUser)
            })
                .then(response => {
                    if (!response.ok) {
                        // Log the error response for debugging
                        console.error('Fetch error response:', response);
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);
                    if (this.modalType === 'add') {
                        this.users.push(data);
                    } else {
                        const index = this.users.findIndex(user => user.id === data.id);
                        this.$set(this.users, index, data);
                    }
                    this.showModal = false; // Close modal after successful addition or update
                    this.fetchUsers(); // Fetch updated user data
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.showModal = false; // Close modal in case of error
                    this.fetchUsers();
                });
        },



        deleteUser(id) {
            fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.users = this.users.filter(user => user.id !== id);
                });
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
            }
        },
        nextPage() {
            if (this.page * this.perPage < this.users.length) {
                this.page++;
            }
        }
    },
    mounted() {
        this.fetchUsers();
    }



};
</script>

<style scoped>
.table-auto {
    width: 100%;
    border-collapse: collapse;
}

.table-auto th,
.table-auto td {
    border: 1px solid #ddd;
    padding: 8px;
}

.table-auto th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
}
</style>
