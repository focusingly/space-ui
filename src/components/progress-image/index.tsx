import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export const ProgressImage = defineComponent<{
  src: string;
  loading?: "lazy" | "eager";
  alt?: string;
}>({
  props: ["src", "lazy", "fallback", "alt"],
  setup(props) {
    const imgRef = ref<HTMLImageElement>();
    const blurDivRef = ref<HTMLDivElement>();

    const ctrlObj = ref({
      loading: true,
      error: false
    });

    let blurVal = 30;
    let rafId: number | void = void 0;
    const rafBlurMaskFadeHandler = () => {
      if (blurVal > 0) {
        blurVal -= 0.5;
        const dom = blurDivRef.value;
        if (dom) {
          dom.style.backdropFilter = `blur(${blurVal}px)`;
        }
      } else {
        if (typeof rafId !== "undefined") {
          cancelAnimationFrame(rafId);
        }
        ctrlObj.value.loading = false;
      }

      rafId = requestAnimationFrame(rafBlurMaskFadeHandler);
    };

    const imgLoadSuccessHandler = () => {
      rafId = requestAnimationFrame(rafBlurMaskFadeHandler);
      imgRef.value?.removeEventListener("load", imgLoadSuccessHandler);
      imgRef.value?.removeEventListener("error", imgLoadErrorHandler);
    };

    const imgLoadErrorHandler = () => {
      ctrlObj.value.error = true;
      ctrlObj.value.loading = false;
      imgRef.value?.removeEventListener("error", imgLoadErrorHandler);
      imgRef.value?.removeEventListener("load", imgLoadSuccessHandler);
    };

    onMounted(() => {
      imgRef.value?.addEventListener("load", imgLoadSuccessHandler);
      imgRef.value?.addEventListener("error", imgLoadErrorHandler);
    });

    onBeforeUnmount(() => {
      const dom = imgRef.value;

      if (dom) {
        if (typeof rafId !== "undefined") {
          cancelAnimationFrame(rafId);
        }
        dom.removeEventListener("load", imgLoadSuccessHandler);
        dom.removeEventListener("error", imgLoadErrorHandler);
      }
    });

    return () => (
      <div
        class={[
          `w-full relative shadow-md select-none rounded-md overflow-hidden`,
          `${ctrlObj.value.loading || ctrlObj.value.error ? "min-h-[20vh]" : ""}`
        ]}
      >
        {!ctrlObj.value.error ? (
          <img
            ref={imgRef}
            src={props.src}
            style={{
              imageRendering: "pixelated",
              margin: 0,
              padding: 0
            }}
            class={`w-full`}
            loading={props.loading || "lazy"}
          />
        ) : null}

        {ctrlObj.value.loading ? (
          <div
            ref={blurDivRef}
            class={`absolute left-0 top-0 w-full h-full`}
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              backdropFilter: `blur(${blurVal}px)`,
              backgroundImage: "linear-gradient(rgba(85, 0, 151, 0.03), rgba(33, 118, 237, 0.08))"
            }}
          ></div>
        ) : ctrlObj.value.error ? (
          <div
            class={`absolute left-0 top-0 w-full h-full flex justify-center items-center`}
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              backgroundImage: "linear-gradient(23deg, rgb(75, 79, 79, 0.2), rgb(113, 110, 151, 0.3))"
            }}
          >
            <div>
              <p class={`dark:text-zinc-50 text-gray-700 text-center font-normal`} style={{ fontSize: "18px" }}>
                {props.alt || "图片加载失败"}
              </p>
              <p
                class={"dark:text-zinc-50 text-center font-thin"}
                style={{
                  fontSize: "15px"
                }}
              >
                Link:{" "}
                <a
                  href={props.src}
                  target="_blank"
                  style={{
                    "--underline-color": "rgb(135, 172, 245)"
                  }}
                  class={`text-indigo-400 font-thin underline-anime`}
                >
                  {props.src}
                </a>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
});
