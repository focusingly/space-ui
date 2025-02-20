import { defineComponent } from "vue";

export const AdminDashboard = defineComponent({
  name: "AdminDashboard",
  setup() {
    return () => (
      <div class={`w-full h-full`}>
        <h1>Admin Dash Board</h1>
      </div>
    );
  }
});
