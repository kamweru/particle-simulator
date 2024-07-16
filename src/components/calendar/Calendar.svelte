<script>
  import "../styles/calendar.css";
  import { sampleData } from "../../components.config";
  import { generateRandomColor } from "../../utils";
  import Flex from "../flex/Flex.svelte";
  import Icon from "@iconify/svelte";
  let pageIndex = "calendar 1",
    calendarData = sampleData.calendar[pageIndex],
    hours = [
      {
        twelve: "12 a.m.",
        twentyFour: "00:00",
      },
      {
        twelve: "1 a.m.",
        twentyFour: "01:00",
      },
      {
        twelve: "2 a.m.",
        twentyFour: "02:00",
      },
      {
        twelve: "3 a.m.",
        twentyFour: "03:00",
      },
      {
        twelve: "4 a.m.",
        twentyFour: "04:00",
      },
      {
        twelve: "5 a.m.",
        twentyFour: "05:00",
      },
      {
        twelve: "6 a.m.",
        twentyFour: "06:00",
      },
      {
        twelve: "7 a.m.",
        twentyFour: "07:00",
      },
      {
        twelve: "8 a.m.",
        twentyFour: "08:00",
      },
      {
        twelve: "9 a.m.",
        twentyFour: "09:00",
      },
      {
        twelve: "10 a.m.",
        twentyFour: "10:00",
      },
      {
        twelve: "11 a.m.",
        twentyFour: "11:00",
      },
      {
        twelve: "12 p.m.",
        twentyFour: "12:00",
      },
      {
        twelve: "1 p.m.",
        twentyFour: "13:00",
      },
      {
        twelve: "2 p.m.",
        twentyFour: "14:00",
      },
      {
        twelve: "3 p.m.",
        twentyFour: "15:00",
      },
      {
        twelve: "4 p.m.",
        twentyFour: "16:00",
      },
      {
        twelve: "5 p.m.",
        twentyFour: "17:00",
      },
      {
        twelve: "6 p.m.",
        twentyFour: "18:00",
      },
      {
        twelve: "7 p.m.",
        twentyFour: "19:00",
      },
      {
        twelve: "8 p.m.",
        twentyFour: "20:00",
      },
      {
        twelve: "9 p.m.",
        twentyFour: "21:00",
      },
      {
        twelve: "10 p.m.",
        twentyFour: "22:00",
      },
      {
        twelve: "11 p.m.",
        twentyFour: "23:00",
      },
    ],
    hourSystem = "twelve";
</script>

<Flex>
  <button
    class="button button-outline button-icon-only"
    on:click={() => {
      hourSystem = hourSystem === "twelve" ? "twentyFour" : "twelve";
    }}
  >
    {#if hourSystem === "twelve"}
      <span class="button-icon font-size-xl">
        <Icon icon="tabler:hours-24"></Icon>
      </span>
    {:else}
      <span class="button-icon font-size-xl">
        <Icon icon="tabler:hours-12"></Icon>
      </span>
    {/if}
  </button>
</Flex>
<div class="calendar">
  {#each hours as item, index}
    {@const color = generateRandomColor(6).replaceAll(", ", "|")}
    <div class="div{index + 1} bg:{color}">
      <div class="p:8 flex jc:center ai:center">
        <span class=" f:semibold">{item[hourSystem]}</span>
      </div>
    </div>
  {/each}
  {#each hours as item, index}
    {#each calendarData.events as event}
      <div class="">
        <div class="p:8 flex ai:center">
          <span class=" f:semibold">{event.title}</span>
        </div>
      </div>
    {/each}
  {/each}
  <div class="div26">
    <div class="p:8 flex ai:center">
      <span class=" f:semibold">Entertainment Law</span>
    </div>
  </div>
</div>
