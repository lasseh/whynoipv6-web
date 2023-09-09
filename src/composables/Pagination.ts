// usePagination.ts
// TODO: Not in use, remove?
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

type FetchDataFunctionType = (offset: number) => Promise<void>;

export default function usePagination(
  initialOffset = 0,
  fetchDataFunction: FetchDataFunctionType
) {
  const router = useRouter();
  const route = useRoute();
  const offset = ref(initialOffset);
  const anchorTop = ref<HTMLElement | null>(null);

  const scrollToAnchor = () => {
    if (anchorTop.value) {
      anchorTop.value.scrollIntoView({ behavior: 'auto' });
    }
  };

  const updateOffset = (newOffset: number) => {
    offset.value = newOffset;
    router.push({ query: { ...route.query, offset: newOffset.toString() } });
  };

  watch(
    () => route.query.offset,
    (newOffset) => {
      const offsetValue = parseInt(newOffset as string);
      if (!isNaN(offsetValue)) {
        offset.value = offsetValue;
        fetchDataFunction(offsetValue);
      }
    }
  );

  return { offset, anchorTop, scrollToAnchor, updateOffset };
}
