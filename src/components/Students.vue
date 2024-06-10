<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Student Management</h1>

        <!-- Button Create Student -->
        <div class="flex justify-end mb-4">
            <button @click="openModal('add')"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Student
            </button>
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
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {{ modalType === 'add' ? 'Add New Student' : 'Edit Student' }}
                                </h3>
                                <div class="mt-2">
                                    <input class="border border-gray-300 rounded p-2 w-full mb-2"
                                        v-model.trim="student.tensinhvien" placeholder="Student Name" />
                                    <input class="border border-gray-300 rounded p-2 w-full mb-2"
                                        v-model.trim="student.email" placeholder="Email" />
                                    <input class="border border-gray-300 rounded p-2 w-full mb-2"
                                        v-model.trim="student.sodienthoai" placeholder="Phone" />
                                    <input class="border border-gray-300 rounded p-2 w-full mb-2"
                                        v-model.trim="student.mssv" placeholder="MSSV" />
                                    <input class="border border-gray-300 rounded p-2 w-full mb-2"
                                        v-model.trim="student.noisinh" placeholder="Place of Birth" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="saveStudent"
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
        <table class="table-auto w-full">
            <thead class="bg-gray-300 text-black">
                <tr>
                    <th class="w-1/6 py-2">ID</th>
                    <th class="w-1/6 py-2">Name</th>
                    <th class="w-1/6 py-2">Email</th>
                    <th class="w-1/6 py-2">Phone</th>
                    <th class="w-1/6 py-2">MSSV</th>
                    <th class="w-1/6 py-2">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-700">
                <tr v-for="(student) in paginatedStudents" :key="student.id">
                    <td class="border px-4 py-2 text-center">{{ student.id }}</td>
                    <td class="border px-4 py-2">{{ student.tensinhvien }}</td>
                    <td class="border px-4 py-2">{{ student.email }}</td>
                    <td class="border px-4 py-2">{{ student.sodienthoai }}</td>
                    <td class="border px-4 py-2">{{ student.mssv }}</td>
                    <td class="border px-4 py-2 text-center">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                            @click="openModal('edit', student)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            @click="deleteStudent(student)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-4 flex justify-start items-center space-x-1">
            <a href="#" @click.prevent="prevPage"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="{ 'cursor-not-allowed': page === 1 }" :disabled="page === 1">Previous</a>
            <a href="#" @click.prevent="nextPage"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="{ 'cursor-not-allowed': page * perPage >= students.length }"
                :disabled="page * perPage >= students.length">Next</a>
        </div>

    </div>
</template>
<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            students: [],
            student: {
                tensinhvien: '',
                email: '',
                sodienthoai: '',
                mssv: '',
                noisinh: ''
            },
            page: 1,
            perPage: 5,
            showModal: false,
            modalType: 'add'
        };
    },
    computed: {
        paginatedStudents() {
            const start = (this.page - 1) * this.perPage;
            const end = start + this.perPage;
            return this.students.slice(start, end);
        }
    },
    methods: {
        fetchStudents() {
            fetch('https://localhost:44395/api/StudentManagement/get-all-sinh-vien')
                .then(response => response.json())
                .then(data => {
                    this.students = data;
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });
        },
        openModal(type, student = null) {
            this.modalType = type;
            if (type === 'edit' && student) {
                this.student = { ...student }; // Copy student object to avoid modifying original
            } else {
                this.student = {
                    tensinhvien: '',
                    email: '',
                    sodienthoai: '',
                    mssv: '',
                    noisinh: ''
                };
            }
            this.showModal = true;
        },
        saveStudent() {
            if (this.modalType === 'add') {
                this.addStudent();
            } else {
                this.updateStudent();
            }
        },
        addStudent() {
            fetch('https://localhost:44395/api/StudentManagement/create-sinh-vien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.student)
            })
                .then(response => response.json())
                .then(data => {
                    this.students.unshift(data); // Add new student to the beginning of the array
                    this.resetStudent();
                    this.showModal = false;
                    this.page = 1; // Reset to the first page
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Student added successfully!'
                    });
                })
                .catch(error => {
                    console.error('Error adding student:', error);
                });
        },
        updateStudent() {
            fetch('https://localhost:44395/api/StudentManagement/update-sinh-vien', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.student)
            })
                .then(response => response.json())
                .then(data => {
                    const index = this.students.findIndex(s => s.id === data.id);
                    if (index !== -1) {
                        this.students.splice(index, 1, data); // Update the student in the array
                    }
                    this.resetStudent();
                    this.showModal = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Student updated successfully!'
                    });
                })
                .catch(error => {
                    console.error('Error updating student:', error);
                });
        },
        deleteStudent(student) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('https://localhost:44395/api/StudentManagement/delete-sinh-vien', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(student)
                    })
                        .then(() => {
                            this.students = this.students.filter(s => s.id !== student.id);
                            Swal.fire(
                                'Deleted!',
                                'Student has been deleted.',
                                'success'
                            );
                        })
                        .catch(error => {
                            console.error('Error deleting student:', error);
                        });
                }
            });
        },
        resetStudent() {
            this.student = {
                tensinhvien: '',
                email: '',
                sodienthoai: '',
                mssv: '',
                noisinh: ''
            };
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
            }
        },
        nextPage() {
            if (this.page * this.perPage < this.students.length) {
                this.page++;
            }
        }
    },
    mounted() {
        this.fetchStudents();
    }
};
</script>
