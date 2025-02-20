import { defineComponent } from "vue";
import { ProgressImage } from "../progress-image";

export const Posts = defineComponent({
  name: "Posts",
  setup() {
    return () => (
      <article class="prose w-full max-w-full sm:prose-sm md:prose-lg lg:prose-xl prose-neutral dark:prose-invert px-8 dark:selection:bg-slate-500 selection:underline selection:decoration-red-500">
        <h1 class={`text-center`}>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with
          the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for
          Halloween.
        </p>
        {[
          "/img/header-bg.jpg",
          "https://wallpaperaccess.com/full/2111331.jpg",
          "https://tse3-mm.cn.bing.net/th/id/OIP-C.CBFZpMOFqyCjyHOJxouwVAHaE8?rs=1&pid=ImgDetMain",
          "https://tse3-mm.cn.bing.net/th/32rsdg34t34dfh43gnf635u346324626252355"
        ].map((t) => (
          <div class={`w-full flex justify-center`}>
            <ProgressImage key={t} src={t} class={`mb-4 md:max-w-[700px] lg:max-w-[900px]`} alt="图片加载失败" />
          </div>
        ))}
      </article>
    );
  }
});
