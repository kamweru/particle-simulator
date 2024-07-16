<script>
  import { onMount } from "svelte";

  // import svelte store to keep track of settings
  import { writable } from "svelte/store";
  import appStore, {
    createColorRuleMap,
    createParticleMap,
  } from "../lib/stores/appStore";
  import { createParticles } from "../lib/stores/appStore";
  import { worker } from "../lib/worker";
  import { getRandomFromRange, getRandomFloat } from "../lib/utils";
  import { colors } from "@master/css";
  // create a store for the canvas size
  const canvasSize = writable({
    width: 540,
    // document.body.clientWidth,
    height: 960,
    // document.body.clientHeight,
  });
  let canvas,
    ctx,
    stream,
    presets = [
      { label: "0", value: 0 },
      { label: "1∕10", value: (1 / 10).toFixed(3) },
      { label: "1∕9", value: (1 / 9).toFixed(3) },
      { label: "1∕8", value: (1 / 8).toFixed(3) },
      { label: "1∕7", value: (1 / 7).toFixed(3) },
      { label: "1∕6", value: (1 / 6).toFixed(3) },
      { label: "1∕5", value: (1 / 5).toFixed(3) },
      { label: "1∕4", value: (1 / 4).toFixed(3) },
      { label: "1∕3", value: (1 / 3).toFixed(3) },
      { label: "3∕8", value: (3 / 8).toFixed(3) },
      { label: "2∕5", value: (2 / 5).toFixed(3) },
      { label: "1∕2", value: (1 / 2).toFixed(3) },
      { label: "3∕5", value: (3 / 5).toFixed(3) },
      { label: "5∕8", value: (5 / 8).toFixed(3) },
      { label: "2∕3", value: (2 / 3).toFixed(3) },
      { label: "3∕4", value: (3 / 4).toFixed(3) },
      { label: "4∕5", value: (4 / 5).toFixed(3) },
      { label: "5∕6", value: (5 / 6).toFixed(3) },
      { label: "6∕7", value: (6 / 7).toFixed(3) },
      { label: "7∕8", value: (7 / 8).toFixed(3) },
      { label: "8∕9", value: (8 / 9).toFixed(3) },
      { label: "9∕10", value: (9 / 10).toFixed(3) },
      { label: "1", value: 1 },
    ],
    charge = "pos",
    chargeIndex = null,
    open = true,
    recorderState = "inactive",
    selectedColor = "none";
  createParticleMap($canvasSize.width, $canvasSize.height);
  createColorRuleMap();
  // let negativepresets = [...presets.splice(0,1)].reverse()
  // console.log([...presets.splice(0, 1)].reverse());
  // for (let i = -1; i <= 1; i += 0.125) {
  //   presets.push(i);
  // }
  // console.log(
  //   $appStore.forceBased.particleMap,
  //   $appStore.forceBased.particles,
  //   $appStore.forceBased.colorRuleMap
  // );
  // create a store for the number of squares
  const squareCount = writable(5);

  // create a store for the media recorder options
  const mediaOptions = writable({
    mimeType: "video/webm;codecs=vp9",
    videoBitsPerSecond: 2500000,
  });

  // create a store for the media recorder instance
  const mediaRecorder = writable(null);

  // create a store for the recorded chunks
  const recordedChunks = writable([]);

  // create a function to generate a random hsl color
  const randomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100) + "%";
    const lightness = Math.floor(Math.random() * 100) + "%";
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  // create a function to generate a random direction
  const randomDirection = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;
    return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
  };

  // create a function to create a square object
  const createSquare = (size, color, direction, x, y) => {
    return { size, color, direction, x, y };
  };

  // create a function to start recording the canvas
  const startRecording = () => {
    // get the media recorder options from the store
    $mediaOptions;

    // create a new media recorder instance
    const recorder = new MediaRecorder(canvas.captureStream(), $mediaOptions);

    // add an event listener for data available
    recorder.addEventListener("dataavailable", (event) => {
      // get the recorded chunks from the store
      $recordedChunks;

      // push the new chunk to the array
      $recordedChunks.push(event.data);

      // update the store
      recordedChunks.set($recordedChunks);
    });

    // start the recording
    recorder.start();

    // update the store
    mediaRecorder.set(recorder);
    recorderState = "recording";
  };

  // create a function to stop recording the canvas
  const stopRecording = () => {
    // get the media recorder instance from the store
    $mediaRecorder;

    // stop the recording
    $mediaRecorder.stop();

    // update the store
    mediaRecorder.set(null);
    recorderState = "inactive";
    downloadVideo();
  };

  // create a function to download the recorded video
  const downloadVideo = () => {
    // get the recorded chunks from the store
    $recordedChunks;

    // create a blob from the chunks
    const blob = new Blob($recordedChunks, {
      type: $mediaOptions.mimeType,
    });

    // create a url for the blob
    const url = URL.createObjectURL(blob);

    // create a link element
    const link = document.createElement("a");

    // set the link attributes
    link.href = url;
    link.download = "canvas-video.webm";

    // append the link to the document
    document.body.appendChild(link);

    // click the link
    link.click();

    // remove the link from the document
    document.body.removeChild(link);
  };

  // create a function to initialize the app
  const init = () => {
    // get the canvas size from the store
    $canvasSize;

    // get the number of squares from the store
    $squareCount;

    // create an array to store the squares
    const squares = [];

    // loop through the number of squares and create them
    for (let i = 0; i < $squareCount; i++) {
      // create a random size between 10 and 50
      const size = Math.floor(Math.random() * 40) + 10;

      // create a random color
      const color = randomHSL();

      // create a random direction
      const direction = randomDirection();

      // create a random position within the canvas
      const x = Math.floor(Math.random() * ($canvasSize.width - size));
      const y = Math.floor(Math.random() * ($canvasSize.height - size));

      // create a square object
      const square = createSquare(size, color, direction, x, y);

      // push the square to the array
      squares.push(square);
    }

    // create a worker script url
    // const workerScript = createWorkerScript();

    // create a worker instance
    // const worker = new Worker(workerScript);

    // add an event listener for messages from the worker
    worker.addEventListener("message", (event) => {
      // console.log("from main", event);
      // get the bitmap from the event
      const bitmap = event.data;

      // draw the bitmap on the canvas
      ctx.drawImage(bitmap, 0, 0);
    });

    // create an offscreen canvas
    const offscreen = new OffscreenCanvas(
      $canvasSize.width,
      $canvasSize.height
    );

    // send a message to the worker with the offscreen canvas and the squares
    worker.postMessage(
      {
        message: "load",
        offscreen,
        particleMap: $appStore.forceBased.particleMap,
        particles: $appStore.forceBased.particles,
        colorRuleMap: $appStore.forceBased.colorRuleMap,
        timeFactor: $appStore.forceBased.timeFactor,
        canvasWidth: $canvasSize.width,
        canvasHeight: $canvasSize.height,
        forceFactor: $appStore.forceBased.forceFactor,
        thresholdDistance: $appStore.forceBased.thresholdDistance,
        aggregate: $appStore.forceBased.aggregate,
      },
      [offscreen]
    );

    // worker.postMessage(
    //   {
    //     offscreen,
    //     squares,
    //     canvasWidth: $canvasSize.width,
    //     canvasHeight: $canvasSize.height,
    //   },
    //   [offscreen]
    // );
  };

  const timeFactorChange = () => {
      worker.postMessage({
        message: "timeFactor",
        timeFactor: $appStore.forceBased.timeFactor,
      });
    },
    thresholdDistanceChange = () => {
      worker.postMessage({
        message: "thresholdDistance",
        thresholdDistance: $appStore.forceBased.thresholdDistance,
      });
    },
    forceFactorChange = () => {
      worker.postMessage({
        message: "forceFactor",
        forceFactor: $appStore.forceBased.forceFactor,
      });
    },
    aggregate = () => {
      $appStore.forceBased.aggregate = !$appStore.forceBased.aggregate;
      worker.postMessage({
        message: "aggregate",
        aggregate: $appStore.forceBased.aggregate,
      });
    },
    randomizeDirection = (color1Name) => {
      if (color1Name === "all") {
        $appStore.forceBased.colorRuleMap =
          $appStore.forceBased.colorRuleMap.map((c) => ({
            ...c,
            direction: getRandomFloat(),
          }));
      } else {
        $appStore.forceBased.colorRuleMap =
          $appStore.forceBased.colorRuleMap.map((c) =>
            c.color1 === color1Name ? { ...c, direction: getRandomFloat() } : c
          );
      }
      worker.postMessage({
        message: "randomizeDirection",
        colorRuleMap: $appStore.forceBased.colorRuleMap,
      });
    };
  const addColor = () => {
    if (selectedColor !== "none") {
      let colorObj = $appStore.forceBased.colors[selectedColor],
        group = createParticles(
          getRandomFromRange(
            $appStore.forceBased.minParticles,
            $appStore.forceBased.maxParticles
          ),
          colorObj.hex,
          $canvasSize.width,
          $canvasSize.height
        ),
        colorRuleMap = [];
      $appStore.forceBased.selectedColors = [
        ...$appStore.forceBased.selectedColors,
        colorObj,
      ];
      colorRuleMap.push({
        color1: colorObj.name,
        color2: colorObj.name,
        hex1: colorObj.hex,
        hex2: colorObj.hex,
        direction: getRandomFloat(),
      });
      $appStore.forceBased.selectedColors.map(({ name, hex }) => {
        if (name !== colorObj.name) {
          colorRuleMap.push({
            color1: name,
            color2: colorObj.name,
            hex1: hex,
            hex2: colorObj.hex,
            direction: getRandomFloat(),
          });
          colorRuleMap.push({
            color1: colorObj.name,
            color2: name,
            hex1: colorObj.hex,
            hex2: hex,
            direction: getRandomFloat(),
          });
        }
      });
      $appStore.forceBased.colorRuleMap = [
        ...$appStore.forceBased.colorRuleMap,
        ...colorRuleMap,
      ];
      worker.postMessage({
        message: "addColor",
        particles: group,
        particleMap: { [colorObj.name]: group },
        colorRuleMap,
      });
      // console.log("onchange", selectedColor);
    }
  };
  const adjustDirection = (index, direction) => {
    worker.postMessage({
      message: "adjustDirection",
      index,
      direction,
    });
  };

  // get the canvas element
  // const canvas = document.getElementById("canvas");
  onMount(() => {
    // get the canvas context
    ctx = canvas.getContext("2d");
    stream = canvas.captureStream();
  });

  // call the init function
  init();
</script>

<main>
  <!-- render the canvas element -->
  <canvas
    bind:this={canvas}
    width={$canvasSize.width}
    height={$canvasSize.height}
    resize="true"
  ></canvas>
  <div class="fixed top:0 left:0 z:1">
    <div class="flex ai:flex-start gap:1">
      <div class="bg:gray-98 p:8 r:4">
        <button
          class="h:32 w:32 flex ai:center jc:center r:4 font:14 font:semibold b:1|solid|gray-28"
          on:click={() => (open = !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"
            />
          </svg>
          <span class="sr-only">controls</span>
        </button>
      </div>
    </div>
  </div>
  <div class="fixed z:2 inset:0 overflow:hidden {open ? '' : 'hidden'}">
    <div class="abs inset:0 overflow:hidden">
      <div class="abs inset:0" aria-hidden="true">
        <div
          class="abs inset:0 bg:gray-98/.0125 bd:blur(1px)
"
          on:click={() => (open = !open)}
          aria-hidden="true"
        />
        <div class="fixed inset:0 flex left:0 max-w:max-content z:2">
          <div
            class="w:3xs flex rel {open ? 'translateX(0)' : 'translateX(100%)'}"
          >
            <div class="flex:1 flex flex:col bg:gray-70 gap:1">
              <div class="h:64 bg:gray-98 flex ai:center">
                <div class="w:full flex ai:center jc:space-between p:8">
                  <div class="text:20 f:semibold">Controls</div>
                  <button
                    class="h:32 w:32 flex ai:center jc:center r:4 font:14 font:semibold b:1|solid|gray-28"
                    on:click={() => (open = !open)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M15.53 4.22a.75.75 0 0 1 0 1.06L8.81 12l6.72 6.72a.75.75 0 1 1-1.06 1.06l-7.25-7.25a.75.75 0 0 1 0-1.06l7.25-7.25a.75.75 0 0 1 1.06 0"
                      />
                    </svg>
                    <span class="sr-only">close</span>
                  </button>
                </div>
              </div>

              <div class="flex:1 overflow-y:scroll bg:gray-98">
                <div class="flex flex:col p:8 mt:12>*+*">
                  <!-- <div class="flex gap:8">
                    <button class="p:4|11 bg:blue-48 r:3 color:white"
                    on:click={() => init()}
                      >initialize</button
                    >
                  </div> -->
                  <div class="flex gap:8">
                    <div class="flex:1 flex flex:col gap:8">
                      <label class="font:14 font:medium" for="minParticles"
                        >Min Particles</label
                      >
                      <input
                        class="font:gray-60::placeholder font:gray-40::placeholder@dark b:1|solid|gray-80 bg:white r:5 mt:5 w:full h:40 px:16 b:gray-28@dark bg:gray-22@dark"
                        type="number"
                        id="minParticles"
                        min="100"
                        step="10"
                        max="500"
                        bind:value={$appStore.forceBased.minParticles}
                      />
                    </div>
                    <div class="flex:1 flex flex:col gap:8">
                      <label class="font:14 font:medium" for="maxParticles"
                        >Max Particles</label
                      >
                      <input
                        class="font:gray-60::placeholder font:gray-40::placeholder@dark b:1|solid|gray-80 bg:white r:5 mt:5 w:full h:40 px:16 b:gray-28@dark bg:gray-22@dark"
                        type="number"
                        id="maxParticles"
                        min="200"
                        step="10"
                        max="500"
                        bind:value={$appStore.forceBased.maxParticles}
                      />
                    </div>
                  </div>
                  <div class="flex jc:space-between ai:center gap:8">
                    <button
                      class="p:4|11 bg:blue-48 r:3 color:white"
                      on:click={aggregate}>aggregate</button
                    >
                    <span>{$appStore.forceBased.aggregate}</span>
                  </div>
                  <div class="flex flex:col gap:8">
                    <div class="flex jc:space-between">
                      <label class="font:14 font:medium" for="thresholdDistance"
                        >Threshold Distance</label
                      >
                      <span>{$appStore.forceBased.thresholdDistance}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      step="1"
                      id="thresholdDistance"
                      max="10"
                      class="flex:1"
                      bind:value={$appStore.forceBased.thresholdDistance}
                      on:input={thresholdDistanceChange}
                    />
                  </div>
                  <div class="flex flex:col gap:8">
                    <div class="flex jc:space-between">
                      <label class="font:14 font:medium" for="forceFactor"
                        >Force Factor</label
                      >
                      <span>{$appStore.forceBased.forceFactor}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0125"
                      step="0.0125"
                      id="forceFactor"
                      max="1"
                      class="flex:1"
                      bind:value={$appStore.forceBased.forceFactor}
                      on:input={forceFactorChange}
                    />
                  </div>
                  <div class="flex flex:col gap:8">
                    <div class="flex jc:space-between">
                      <label class="font:14 font:medium" for="timeFactor"
                        >Time Factor</label
                      >
                      <span>{$appStore.forceBased.timeFactor}</span>
                    </div>
                    <!-- <input
                      class="font:gray-60::placeholder font:gray-40::placeholder@dark b:1|solid|gray-80 bg:white r:5 mt:5 w:full h:40 px:16 b:gray-28@dark bg:gray-22@dark"
                      type="number"
                      id="timeFactor"
                      min="0.0125"
                      step="0.0125"
                      max="1"
                      bind:value={$appStore.forceBased.timeFactor}
                      on:input={timeFactorChange}
                    /> -->
                    <input
                      type="range"
                      min="0.0125"
                      step="0.0005"
                      id="timeFactor"
                      max="1"
                      class="flex:1"
                      bind:value={$appStore.forceBased.timeFactor}
                      on:input={timeFactorChange}
                    />
                  </div>
                  <div class="flex ai:center gap:8">
                    <label for="selectColors" class="">Add color</label>
                    <select
                      name="colors"
                      id="selectColors"
                      class="appearance:none outline:none block b:1|solid|gray-70 b:indigo-70:hover b:indigo-70:focus r:4 f:14 h:32 px:8 capitalize transition:all|300ms|ease-in-out b:gray-28@dark bg:gray-22@dark flex:1 background-position:right|0.125rem|center background-repeat:no-repeat background-size:1.5em|1.5em"
                      bind:value={selectedColor}
                      on:change={addColor}
                    >
                      <option value="none">add color</option>
                      {#each $appStore.forceBased.colors as { name, hex }, index}
                        {#if !$appStore.forceBased.selectedColors
                          .map((item) => item.name)
                          .includes(name)}
                          <option value={index}> {name}</option>
                        {/if}
                      {/each}
                    </select>
                  </div>
                  {#if $appStore.forceBased.colorRuleMap && $appStore.forceBased.colorRuleMap.length > 0}
                    <div class="flex flex:col gap:8">
                      <div class="flex jc:space-between">
                        <div class="font:14 font:medium">Color Rules</div>
                        <button
                          class="r:3 b:1|solid|crimson-80 bg:crimson-88 color:crimson f:12 px:4"
                          on:click={() => randomizeDirection("all")}
                          >randomize all</button
                        >
                      </div>
                      <div
                        class="r:4 flex:1 b:1|solid|gray-32 r:4 overflow-y:scroll w:0::scrollbar b:1|solid|gray-30 bb:1|solid|gray-30>* bb:none>*:last"
                        id="rules"
                      >
                        {#each [...new Set($appStore.forceBased.colorRuleMap.map((x) => x.color1))] as color1Name}
                          <div>
                            <div
                              class="flex gap:8 p:4 ai:center bb:1|solid|gray-30"
                            >
                              <span
                                class="h:10 w:10 bg:{$appStore.forceBased.colorRuleMap.find(
                                  ({ color1 }) => color1 === color1Name
                                )['hex1']}"
                              ></span>
                              <span>
                                {color1Name} - {$appStore.forceBased.particles.filter(
                                  ({ color }) =>
                                    color ===
                                    $appStore.forceBased.colorRuleMap.find(
                                      ({ color1 }) => color1 === color1Name
                                    ).hex1
                                ).length}
                              </span>
                              <button
                                class="ml:auto r:3 b:1|solid|crimson-80 bg:crimson-88 color:crimson f:12 px:4"
                                on:click={() => randomizeDirection(color1Name)}
                                >randomize direction</button
                              >
                            </div>
                            <div
                              class="bg:gray-88 flex flex:col bt:1|solid|gray-30>*+*"
                            >
                              {#each $appStore.forceBased.colorRuleMap as { color1, color2, hex1, hex2, direction }, index}
                                {#if color1 === color1Name}
                                  <label
                                    class="flex ai:center gap:8 px:12 py:4"
                                  >
                                    <span class="flex ai:center gap:8 w:120">
                                      <span class="h:10 w:10 bg:{hex2}"> </span>
                                      <span>{color2}</span>
                                    </span>
                                    <input
                                      type="range"
                                      min="-1"
                                      max="1"
                                      step="0.001"
                                      class="flex:1"
                                      bind:value={direction}
                                      on:input={() =>
                                        adjustDirection(index, direction)}
                                    />
                                    <span class="w:60 text:end"
                                      >{direction}</span
                                    >
                                  </label>
                                  <!-- <div class="flex">
                                  <div
                                    class="flex flex:wrap ai:center gap:4 p:8"
                                  >
                                    {#each presets as { label, value: preset }}
                                      <button
                                        class="f:12 px:4 min-w:20 r:3 py:2 bg:{charge ===
                                          'neg' && chargeIndex === index
                                          ? 'crimson-88 b:1|solid|crimson-80'
                                          : 'cyan'} color:{charge === 'neg' &&
                                        chargeIndex === index
                                          ? 'crimson'
                                          : 'cyan-98'} f:semibold"
                                        on:click={() => {
                                          direction = preset;
                                          if (charge === "neg")
                                            direction = preset * -1;

                                          adjustDirection(index, direction);
                                        }}
                                      >
                                        {label}
                                      </button>
                                    {/each}
                                  </div>
                                  <div class="flex flex:col gap:2 p:3">
                                    <button
                                      class="flex:1 r:3 b:1|solid|cyan bg:cyan color:cyan-98 f:12 p:4"
                                      on:click={() => {
                                        charge = "pos";
                                        chargeIndex = index;
                                      }}>pos</button
                                    >
                                    <button
                                      class="flex:1 r:3 b:1|solid|crimson-80 bg:crimson-88 color:crimson f:12 p:4"
                                      on:click={() => {
                                        charge = "neg";
                                        chargeIndex = index;
                                      }}>neg</button
                                    >
                                  </div>
                                </div> -->
                                {/if}
                              {/each}
                            </div>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/if}
                  <div class="flex flex:col gap:8">
                    <label class="font:14 font:medium" for="partitionSizeInput"
                      >partition size</label
                    >
                    <input
                      class="font:gray-60::placeholder font:gray-40::placeholder@dark b:1|solid|gray-88 bg:white r:5 mt:5 w:full h:40 px:16 b:gray-28@dark bg:gray-22@dark"
                      type="number"
                      id="partitionSizeInput"
                      min="10"
                      step="1"
                      value="25"
                    />
                  </div>
                  <div class="flex flex:col gap:8">
                    <div
                      class="font:14 font:medium flex ai:center jc:space-between"
                    >
                      <span>Canvas Orientation</span>
                      <span>landscape</span>
                    </div>
                    <button
                      class="bg:indigo bg:indigo-54:hover bg:indigo-58:active outline:indigo-80|3|solid:focus ~outline-width|.1s px:18 h:40 f:14 f:semibold f:white r:4 inline-flex align-items:center jc:center"
                      id="toggleOrientation"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6.75 4a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zM3.5 8.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0zM2 12.9c0-1.05.85-1.9 1.9-1.9h10.2c1.05 0 1.9.85 1.9 1.9v5.2a1.9 1.9 0 0 1-1.9 1.9H3.9A1.9 1.9 0 0 1 2 18.1zM12.25 11a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75m-8.5-5.5a.25.25 0 0 0-.25.25v.5a.75.75 0 0 1-1.5 0v-.5C2 4.784 2.784 4 3.75 4h.5a.75.75 0 0 1 0 1.5zm7.75.25a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v.5a.75.75 0 0 1-1.5 0zM17 16.076c0 .484.419.87.888.747a5.502 5.502 0 0 0-.373-10.73l.304-.355a.75.75 0 1 0-1.138-.976l-1.5 1.75a.75.75 0 0 0 0 .976l1.5 1.75a.75.75 0 1 0 1.138-.976l-.597-.697a4.001 4.001 0 0 1 .372 7.783c-.333.095-.594.381-.594.728"
                        />
                      </svg>
                      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6.75 4a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zM3.5 8.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0zM3.9 11A1.9 1.9 0 0 0 2 12.9v5.2c0 1.05.85 1.9 1.9 1.9h10.2a1.9 1.9 0 0 0 1.9-1.9v-5.2a1.9 1.9 0 0 0-1.9-1.9h-1.85a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .414.336.75.75.75zm-.4 1.9c0-.22.18-.4.4-.4h10.2c.22 0 .4.18.4.4v5.2a.4.4 0 0 1-.4.4H3.9a.4.4 0 0 1-.4-.4zm.25-7.4a.25.25 0 0 0-.25.25v.5a.75.75 0 0 1-1.5 0v-.5C2 4.784 2.784 4 3.75 4h.5a.75.75 0 0 1 0 1.5zm7.75.25a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v.5a.75.75 0 0 1-1.5 0zM17 16.076c0 .484.419.87.888.747a5.502 5.502 0 0 0-.373-10.73l.304-.355a.75.75 0 1 0-1.138-.976l-1.5 1.75a.75.75 0 0 0 0 .976l1.5 1.75a.75.75 0 1 0 1.138-.976l-.597-.697a4.001 4.001 0 0 1 .372 7.783c-.333.095-.594.381-.594.728" />
                            </svg> -->

                      <span class="sr-only">orientation</span>
                    </button>
                    {#if recorderState === "inactive"}
                      <button
                        class="h:40 flex ai:center jc:center gap:8 r:4 font:14 font:semibold b:1|solid|gray-28"
                        id="recordVideoButton"
                        on:click={startRecording}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-16C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0"
                          />
                        </svg>
                        <span>record video</span>
                      </button>
                    {/if}
                    {#if recorderState === "recording"}
                      <button
                        class="h:40 flex ai:center jc:center gap:8 r:4 font:14 font:semibold b:1|solid|gray-28"
                        id="recordVideoButton"
                        on:click={stopRecording}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0-16C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0"
                          />
                        </svg>
                        <span>stop recording</span>
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
              <div class="flex jc:end p:16 gap:16 bg:gray-98">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.75 4a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zM3.5 8.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0zM2 12.9c0-1.05.85-1.9 1.9-1.9h10.2c1.05 0 1.9.85 1.9 1.9v5.2a1.9 1.9 0 0 1-1.9 1.9H3.9A1.9 1.9 0 0 1 2 18.1zM12.25 11a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75m-8.5-5.5a.25.25 0 0 0-.25.25v.5a.75.75 0 0 1-1.5 0v-.5C2 4.784 2.784 4 3.75 4h.5a.75.75 0 0 1 0 1.5zm7.75.25a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v.5a.75.75 0 0 1-1.5 0zM17 16.076c0 .484.419.87.888.747a5.502 5.502 0 0 0-.373-10.73l.304-.355a.75.75 0 1 0-1.138-.976l-1.5 1.75a.75.75 0 0 0 0 .976l1.5 1.75a.75.75 0 1 0 1.138-.976l-.597-.697a4.001 4.001 0 0 1 .372 7.783c-.333.095-.594.381-.594.728"
                    />
                  </svg>
                  <span class="sr-only">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- render some buttons to control the recording
  <button on:click={startRecording}>Start recording</button>
  <button on:click={stopRecording}>Stop recording</button>
  <button on:click={downloadVideo}>Download video</button> -->
</main>
