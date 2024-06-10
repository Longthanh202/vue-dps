<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Vue Fundamentals</h1>

    <!-- Button Create Post -->
    <div class="flex justify-end mb-4">
      <button @click="openModal('add')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Post
      </button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ modalType === 'add' ? 'Create New Post' : 'Edit Post' }}
                </h3>
                <div class="mt-2">
                  <input class="border border-gray-300 rounded p-2 w-full mb-2" v-model.trim="postTitle"
                    placeholder="Post Title" />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="savePost"
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
          <th class="w-1/3 py-2">ID</th>
          <th class="w-1/3 py-2">Title</th>
          <th class="w-1/3 py-2">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr v-for="(post, index) in paginatedPosts" :key="post.id">
          <td class="border px-4 py-2 text-center" style="width: 10%;">{{ index + 1 + (page - 1) * perPage }}</td>
          <td class="border px-4 py-2" style="width: 50%;">{{ post.title }}</td>
          <td class="border px-4 py-2 text-center" style="width: 25%;">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
              @click="openModal('edit', post)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              @click="deletePost(post.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-4 flex justify-start items-center space-x-1">
      <a href="#"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click.prevent="prevPage" :class="{ 'cursor-not-allowed': page === 1 }" :disabled="page === 1">Previous</a>
      <a href="#"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click.prevent="nextPage" :class="{ 'cursor-not-allowed': page * perPage >= posts.length }"
        :disabled="page * perPage >= posts.length">Next</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      postTitle: '',
      postId: null,
      page: 1,
      perPage: 5,
      showModal: false,
      modalType: 'add'
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.posts.slice(start, end);
    }
  },
  methods: {
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    },
    openModal(type, post = null) {
      this.modalType = type;
      if (type === 'edit' && post) {
        this.postId = post.id;
        this.postTitle = post.title;
      } else {
        this.postId = null;
        this.postTitle = '';
      }
      this.showModal = true;
    },
    savePost() {
      if (this.modalType === 'add') {
        this.addPost();
      } else {
        this.updatePost();
      }
    },
    addPost() {
      if (this.postTitle) {
        const newPost = {
          title: this.postTitle,
          completed: false
        };
        fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPost)
        })
          .then(response => response.json())
          .then(data => {
            this.posts.unshift(data); // Add new post to the beginning of the array
            this.postTitle = '';
            this.showModal = false;
            this.page = 1; // Reset to the first page
            Swal.fire({
              title: 'Success!',
              text: `Post added successfully!`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            this.showModal = false;
          });
      }
    },
    updatePost() {
      if (this.postTitle) {
        // Instead of making a PUT request, update the post locally
        const index = this.posts.findIndex(post => post.id === this.postId);
        if (index !== -1) {
          this.posts[index].title = this.postTitle;
        }
        this.postTitle = '';
        this.showModal = false;
        Swal.fire({
          title: 'Success!',
          text: `Post updated locally!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    deletePost(postId) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${postId}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.posts = this.posts.filter(post => post.id !== postId);
        });
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page * this.perPage < this.posts.length) {
        this.page++;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
input {
  width: calc(100% - 20px);
}
</style>
