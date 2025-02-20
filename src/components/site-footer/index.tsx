import { defineComponent } from "vue";

export const SiteFooter = defineComponent({
  name: "SiteFooter",
  setup: () => {
    return () => (
      <footer class={`h-[180px] border-t border-solid dark:text-zinc-600`}>
        <div class={"w-full h-full flex items-center justify-center"}>
          <p>
            @Copyright{" "}
            <a
              style={{
                "--underline-color": "rgb(128, 109, 224)"
              }}
              class={`underline-anime`}
              href="#"
            >
              space.shalling.me
            </a>
          </p>
        </div>
      </footer>
    );
  }
});
