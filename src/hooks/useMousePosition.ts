import {onMounted, onUnmounted, Ref, ref} from "vue";

interface MousePosition {
    x: Ref<number>;
    y: Ref<number>;
}
export function useMousePosition(): MousePosition {
    const x = ref(0);
    const y = ref(0);

    function update(e: MouseEvent) {
        x.value = e.pageX;
        y.value = e.pageY;
    }

    onMounted(() => {
        window.addEventListener('mousemove', update);
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', update);
    })

    return { x, y };

}