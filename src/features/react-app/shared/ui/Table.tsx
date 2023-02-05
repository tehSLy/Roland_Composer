import { Divider } from "./Divider";
import { Typography } from "./Typography";
import tw from "tailwind-styled-components";

type TableProps = {
  dataSource: string[][];
  columns: string[];
};

export const Table = ({ dataSource, columns }: TableProps) => {
  return (
    <div>
      <TableRow>
        {columns.map((column) => (
          <TableRowColumn className="bg-neutral-600">
            <Typography bold>{column}</Typography>
          </TableRowColumn>
        ))}
      </TableRow>
      <Divider />
      <ul>
        {dataSource.map((tableRow) => {
          return (
            <TableRow>
              {tableRow.map((column) => (
                <TableRowColumn>{column}</TableRowColumn>
              ))}
            </TableRow>
          );
        })}
      </ul>
    </div>
  );
};

const TableRow = tw.li`
  grid
  grid-cols-[3fr_2fr]
  odd:bg-neutral-700
`;

const TableRowColumn = tw.div`
  px-4
  py-1
`;
