import { defineComponent } from "vue";

export const AdminDashboard = defineComponent({
  name: "AdminDashboard",
  setup() {
    return () => (
      <div class={`w-full h-full`}>
        <div class="flex flex-col h-full">
          <header class="bg-gray-800 text-white p-4">
            <h1 class="text-xl">Admin Dashboard</h1>
          </header>
          <div class="flex flex-1">
            <aside class="w-64 bg-gray-700 text-white p-4">
              <nav>
                <ul>
                  <li class="mb-2">
                    <a href="#" class="hover:underline">
                      Dashboard
                    </a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="hover:underline">
                      Users
                    </a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="hover:underline">
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
            <main class="flex-1 bg-gray-100 p-4">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
                <p class="text-gray-700">This is where you can manage your application.</p>
              </div>
            </main>
          </div>
          <footer class="bg-gray-800 text-white p-4 text-center">&copy; 2023 Your Company</footer>
        </div>
      </div>
    );
  }
});

export default AdminDashboard;
