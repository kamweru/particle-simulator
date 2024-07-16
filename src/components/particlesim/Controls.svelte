<script>
  import Field from "../field/Field.svelte";
  import Flex from "../flex/Flex.svelte";
  import Input from "../input/Input.svelte";
  import Range from "../range/Range.svelte";

  let controls = {};
</script>

<Flex>
  <div class="bg:crimson-90 padding-sm">
    <Range></Range>
    <Field>
      <span slot="label">label</span>
      <Input slot="input"></Input>
    </Field>
  </div>
</Flex>
