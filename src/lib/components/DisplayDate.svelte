<script lang="ts">
  import { formatDisplayDate } from "$lib/seo";

  interface Props {
    date: string;
    class?: string;
  }

  let { date, class: className = "" }: Props = $props();
  const label = $derived(formatDisplayDate(date));
</script>

<time class={className} datetime={date}>{label}</time>
