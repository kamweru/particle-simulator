import _Table from "./Table.svelte";
import _TableData from "./TableData.svelte";
import _TableHeader from "./TableHeader.svelte";
import _TableRow from "./TableRow.svelte";
_Table.Td = _TableData;
_Table.Th = _TableHeader;
_Table.Tr = _TableRow;
const Table = _Table;
export { Table };
