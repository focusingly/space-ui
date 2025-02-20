import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

export const ErrorPage = defineComponent({
  setup() {
    const remain = ref(5);
    const router = useRouter();
    const route = useRoute();

    let id: number | void = setInterval(() => {
      if (remain.value > 0) {
        remain.value--;
      } else {
        clearInterval(id!);
        id = void 0;
        router.replace({ name: "home" });
      }
    }, 1000);
    onBeforeRouteLeave(() => {
      if (id) {
        clearInterval(id);
      }
    });

    return () => (
      <div class={`p-2 border-solid border border-slate-500 rounded-md shadow-2xl shadow-white`}>
        <h1>Oops</h1>
        <p class={`underline decoration-wavy decoration-red-900`}>
          <span>Current Link Not Match: {route.fullPath}</span>
          <span>
            remain {remain.value}s redirect to home or{" "}
            <button
              class={`border border-solid border-violet-800 outline-none rounded-md px-2 hover:delay-200 hover:ease-out hover:underline hover:transition-all hover:shadow-md hover:shadow-white`}
              onClick={() => {
                router.replace({
                  name: "home"
                });
              }}
            >
              Go Home
            </button>
            now
          </span>
        </p>
      </div>
    );
  }
});

export default ErrorPage;
